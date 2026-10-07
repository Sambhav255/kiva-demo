'use client';
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from 'react';
import Link from 'next/link';
import { SurfaceCard } from '@/components/common/SurfaceCard';
import { PrimaryButton, SecondaryButton } from '@/components/common/Buttons';
import { PlanResult } from './PlanResult';
import {
  CAUSES,
  LOCATIONS,
  createDraft,
  completePlan,
  parsePlan,
  validateDraft,
  participationLabels,
  fundingLabels,
  repaymentLabels,
  type Draft,
  type Plan,
} from '@/lib/impact-plan/model';
import {
  readStoredPlan,
  subscribeToPlan,
  writeStoredPlan,
} from '@/lib/impact-plan/storage';

function ChoiceGroup<T extends string>({
  name,
  legend,
  options,
  value,
  onChange,
}: {
  name: string;
  legend: string;
  options: {
    value: T;
    title: string;
    description: string;
    disabled?: boolean;
  }[];
  value: T | '';
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="choice-group" aria-describedby="plan-error">
      <legend>{legend}</legend>
      {options.map((option) => (
        <label
          key={option.value}
          className={`choice-card ${value === option.value ? 'is-selected' : ''} ${option.disabled ? 'is-disabled' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            disabled={option.disabled}
            onChange={() => onChange(option.value)}
          />
          <span>
            <strong>{option.title}</strong>
            <span className="choice-description">{option.description}</span>
          </span>
          {value === option.value && (
            <span aria-hidden="true" className="selected-check">
              ✓
            </span>
          )}
        </label>
      ))}
    </fieldset>
  );
}
const headings = [
  'How involved do you want to be?',
  'What matters to you?',
  'How should your money move?',
];
const stepLabels = ['Participation', 'Priorities', 'Money'];

export function ImpactPlanDemo() {
  const stored = useSyncExternalStore(
    subscribeToPlan,
    readStoredPlan,
    () => null,
  );
  const savedPlan = useMemo(() => parsePlan(stored), [stored]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [completed, setCompleted] = useState<Plan | null>(null);
  const [editing, setEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const values = draft ?? createDraft(savedPlan ?? undefined);
  const result = completed ?? savedPlan;
  const showResult = result !== null && !editing;
  useEffect(() => {
    document.getElementById('plan-heading')?.focus();
  }, [step, showResult]);

  function update(patch: Partial<Draft>) {
    setDraft({ ...values, ...patch });
    setError('');
    setNotice('');
  }
  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 0 && !values.participation) {
      setError('Choose how involved you want to be.');
      return;
    }
    if (step === 1 && values.causes.length === 0) {
      setError('Choose at least one cause.');
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      setError('');
      return;
    }
    const validationError = validateDraft(values);
    const plan = completePlan(values);
    if (validationError || !plan) {
      setError(validationError ?? 'Please check your choices.');
      return;
    }
    const persisted = writeStoredPlan(JSON.stringify(plan));
    setNotice(
      persisted
        ? ''
        : 'Browser storage is unavailable. Your plan is shown here, but will not survive a refresh.',
    );
    setCompleted(plan);
    setEditing(false);
  }
  function reset() {
    const cleared = writeStoredPlan(null);
    setCompleted(null);
    setDraft(createDraft());
    setEditing(true);
    setStep(0);
    setError('');
    setNotice(
      cleared
        ? 'Demo reset. Start a new plan.'
        : 'The demo has reset here, but browser storage could not be cleared.',
    );
  }
  return (
    <section
      className={showResult ? 'result-page' : 'wizard-page'}
      aria-labelledby="plan-heading"
    >
      <Link href="/" className="back-link">
        ← Back to concept
      </Link>
      {notice && (
        <p className="storage-notice" role="status">
          {notice}
        </p>
      )}
      {showResult ? (
        <PlanResult
          plan={result}
          onEdit={() => {
            setDraft(createDraft(result));
            setEditing(true);
            setStep(0);
            setError('');
          }}
          onReset={reset}
        />
      ) : (
        <>
          <ol className="step-progress" aria-label="Impact Plan progress">
            {stepLabels.map((label, index) => (
              <li
                key={label}
                aria-current={step === index ? 'step' : undefined}
                className={index <= step ? 'step-reached' : ''}
              >
                <span aria-hidden="true">{index < step ? '✓' : index + 1}</span>
                {label}
              </li>
            ))}
          </ol>
          <SurfaceCard className="wizard-card">
            <span className="eyebrow">Step {step + 1} of 3</span>
            <h1 id="plan-heading" tabIndex={-1}>
              {headings[step]}
            </h1>
            <form onSubmit={advance} noValidate>
              {step === 0 && (
                <>
                  <p className="step-intro">You choose the level of control.</p>
                  <ChoiceGroup
                    name="participation"
                    legend="Participation style"
                    value={values.participation}
                    onChange={(participation) => {
                      const changesRepayment =
                        participation === 'manual' &&
                        values.repayment === 'auto_relend';
                      update({
                        participation,
                        ...(changesRepayment
                          ? { repayment: 'balance' as const }
                          : {}),
                      });
                      if (changesRepayment)
                        setNotice(
                          'Repayments now return to your available balance so you can choose every borrower. You can change this in step 3.',
                        );
                    }}
                    options={[
                      {
                        value: 'manual',
                        title: participationLabels.manual,
                        description: 'You decide where each loan goes.',
                      },
                      {
                        value: 'guided',
                        title: participationLabels.guided,
                        description:
                          'See a few matches, then choose a borrower.',
                      },
                      {
                        value: 'automatic',
                        title: participationLabels.automatic,
                        description:
                          'Let your preferences guide borrower selection.',
                      },
                    ]}
                  />
                </>
              )}
              {step === 1 && (
                <>
                  <p className="step-intro">
                    Choose one or more causes. You can change these later.
                  </p>
                  <fieldset
                    className="cause-fieldset"
                    aria-describedby="cause-help plan-error"
                    aria-invalid={Boolean(error)}
                  >
                    <legend>Causes</legend>
                    <div className="cause-grid">
                      {CAUSES.map((cause) => (
                        <label
                          key={cause}
                          className={`cause-chip ${values.causes.includes(cause) ? 'is-selected' : ''}`}
                        >
                          <input
                            type="checkbox"
                            checked={values.causes.includes(cause)}
                            onChange={(event) =>
                              update({
                                causes: event.target.checked
                                  ? [...values.causes, cause]
                                  : values.causes.filter(
                                      (value) => value !== cause,
                                    ),
                              })
                            }
                          />
                          {cause}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <p id="cause-help" className="field-help">
                    Broader preferences leave more possibilities open.
                  </p>
                  <div className="preference-grid">
                    <label>
                      Location <span className="optional">(optional)</span>
                      <select
                        value={values.location}
                        onChange={(event) =>
                          update({
                            location: event.target.value as Draft['location'],
                          })
                        }
                      >
                        {LOCATIONS.map((location) => (
                          <option key={location}>{location}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Borrower gender{' '}
                      <span className="optional">(optional)</span>
                      <select
                        value={values.gender}
                        onChange={(event) =>
                          update({
                            gender: event.target.value as Draft['gender'],
                          })
                        }
                      >
                        <option value="any">Any gender</option>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                      </select>
                    </label>
                  </div>
                </>
              )}
              {step === 2 && (
                <div className="money-options">
                  <ChoiceGroup
                    name="funding"
                    legend="Funding"
                    value={values.funding}
                    onChange={(funding) => update({ funding })}
                    options={[
                      {
                        value: 'manual',
                        title: fundingLabels.manual,
                        description: 'No new money is added automatically.',
                      },
                      {
                        value: 'monthly',
                        title: fundingLabels.monthly,
                        description:
                          'Illustrate a recurring contribution. No charge is made.',
                      },
                      {
                        value: 'repayments_only',
                        title: fundingLabels.repayments_only,
                        description:
                          'No new deposit; use money returned from earlier loans.',
                      },
                    ]}
                  />
                  {values.funding === 'monthly' && (
                    <label className="amount-field">
                      Monthly amount (USD)
                      <input
                        type="number"
                        inputMode="decimal"
                        min="0.01"
                        max="1000000"
                        step="0.01"
                        value={values.monthlyAmount}
                        onChange={(event) =>
                          update({ monthlyAmount: event.target.value })
                        }
                        aria-describedby="amount-help plan-error"
                        aria-invalid={Boolean(error)}
                      />
                      <span id="amount-help" className="field-help">
                        Example only. No payment details or recurring charge.
                      </span>
                    </label>
                  )}
                  <ChoiceGroup
                    name="repayment"
                    legend="Repayments"
                    value={values.repayment}
                    onChange={(repayment) => update({ repayment })}
                    options={[
                      {
                        value: 'balance',
                        title: repaymentLabels.balance,
                        description:
                          'Repaid money waits until you decide to use it.',
                      },
                      {
                        value: 'recommend',
                        title: repaymentLabels.recommend,
                        description:
                          'You choose from new matches when money returns.',
                      },
                      {
                        value: 'auto_relend',
                        title: repaymentLabels.auto_relend,
                        description:
                          'Returned money supports another borrower automatically.',
                        disabled: values.participation === 'manual',
                      },
                    ]}
                  />
                  {values.participation === 'manual' && (
                    <p className="compatibility-note">
                      Choosing every borrower keeps you in control. To relend
                      automatically, go Back and choose a guided or automatic
                      participation style.
                    </p>
                  )}
                  {values.participation === 'automatic' &&
                    values.repayment !== 'auto_relend' && (
                      <p className="compatibility-note">
                        {values.funding === 'repayments_only'
                          ? 'This plan adds no new funds. '
                          : 'New funds use automatic borrower selection. '}
                        {values.repayment === 'balance'
                          ? 'Repayments wait in your available balance until you choose to use them.'
                          : 'When repayments return, you choose from new matches instead of relending automatically.'}
                      </p>
                    )}
                  {values.funding === 'repayments_only' && (
                    <p className="field-help">
                      This example assumes an earlier loan returns $25. Without
                      repayments, no money enters the plan.
                    </p>
                  )}
                </div>
              )}
              <p
                id="plan-error"
                className="form-error"
                role={error ? 'alert' : undefined}
              >
                {error}
              </p>
              <div className="wizard-actions">
                {step > 0 ? (
                  <SecondaryButton
                    onClick={() => {
                      setStep(step - 1);
                      setError('');
                    }}
                  >
                    Back
                  </SecondaryButton>
                ) : (
                  <span />
                )}
                <PrimaryButton type="submit">
                  {step === 2 ? 'See my Impact Plan' : 'Continue'}{' '}
                  <span aria-hidden="true">→</span>
                </PrimaryButton>
              </div>
            </form>
          </SurfaceCard>
        </>
      )}
    </section>
  );
}
