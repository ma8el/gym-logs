export const required = (value: string) => !!value || 'This field is required.'
  
    // 2. Email format
export const email = (value: string) => {
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      return pattern.test(value) || 'Invalid email.'
    }
  
    // 3. Minimum length
export const minLength = (min: number) => {
      return (value: string) =>
        value.length >= min || `Minimum ${min} characters required.`
    }
  
    // 4. Maximum length
export const maxLength = (max: number) => {
      return (value: string) =>
        value.length <= max || `Maximum ${max} characters allowed.`
    }
  
    // 5. Integer validation
export const isInteger = (value: string) => {
      const pattern = /^-?\d+$/
      return pattern.test(value) || 'Value must be an integer.'
    }