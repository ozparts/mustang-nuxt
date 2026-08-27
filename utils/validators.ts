import { helpers, required } from "@vuelidate/validators";

/**
 * Shared Vuelidate rules.
 *
 * Format rules skip empty values on purpose - only `required` reports a missing
 * value, so a blank field never shows two errors at once.
 */

const optional = (check: (value: string) => boolean) => (value: unknown) =>
  !helpers.req(value) || check(String(value));

const localPart = (value: string) => value.split("@")[0] ?? "";
const domainPart = (value: string) => value.split("@")[1] ?? "";

/**
 * Canonical email checks: strict format, no consecutive dots, max 254 chars
 * total, max 64 chars before the @, no leading/trailing dot in the local part
 * and no label in the domain starting or ending with a hyphen.
 */
export const emailFormatValidators = {
  format: helpers.withMessage(
    "Please enter a valid email address, for example name@example.com",
    optional((value) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)),
  ),
  noConsecutiveDots: helpers.withMessage(
    "Email address must not contain two dots in a row",
    optional((value) => !/\.{2,}/.test(value)),
  ),
  maxTotalLength: helpers.withMessage(
    "Email address must be 254 characters or fewer",
    optional((value) => value.length <= 254),
  ),
  maxLocalLength: helpers.withMessage(
    "The part before the @ must be 64 characters or fewer",
    optional((value) => localPart(value).length <= 64),
  ),
  noEdgeDots: helpers.withMessage(
    "The part before the @ must not start or end with a dot",
    optional((value) => !/^\.|\.$/.test(localPart(value))),
  ),
  noEdgeHyphens: helpers.withMessage(
    "The domain must not start or end with a hyphen",
    optional((value) => !/(?:^|\.)-|-(?:\.|$)/.test(domainPart(value))),
  ),
};

export const emailValidators = (
  requiredMessage = "Please enter your email address",
) => ({
  required: helpers.withMessage(requiredMessage, required),
  ...emailFormatValidators,
});
