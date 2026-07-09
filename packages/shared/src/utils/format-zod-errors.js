function formatFieldName(field) {
  return field.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

export function formatZodErrors(issues) {
  const errors = {};

  for (const issue of issues) {
    const field = issue.path.join(".") || "request";

    if (issue.code === "invalid_type") {
      errors[field] = `${formatFieldName(field)} is required`;
    } else {
      errors[field] = issue.message;
    }
  }

  return errors;
}
