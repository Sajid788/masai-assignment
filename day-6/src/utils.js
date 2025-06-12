/**
 * Utility functions demonstrating ES6 features
 */

// Demonstrates optional chaining
export const getNestedValue = (obj, path) => {
  const keys = path.split('.');
  return keys.reduce((acc, key) => acc?.[key], obj);
};

// Demonstrates nullish coalescing
export const getValueWithDefault = (value, defaultValue) => value ?? defaultValue;

// Example complex data processor
export const processData = (data) => {
  const name = getValueWithDefault(data?.user?.name, 'Unknown');
  const age = getValueWithDefault(data?.user?.profile?.age, 0);
  const email = getNestedValue(data, 'user.contact.email') ?? 'No email provided';
  
  return {
    name,
    age,
    email,
    summary: `${name} (${age}) - ${email}`,
  };
};

export default {
  getNestedValue,
  getValueWithDefault,
  processData,
}; 