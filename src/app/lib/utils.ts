// Function to determine if the value is a city name or a zipcode
export const determineLocationType = (queryValue: string): 'address' | 'zipcode' | null => {
    // Pattern to check if the value is a zipcode (only digits and length between 3 and 10)
    const zipcodePattern = /^\d{3,10}$/;
  
    // Check if the value matches the zipcode pattern
    if (zipcodePattern.test(queryValue)) {
      return 'zipcode';
    }
  
    // If it's not a zipcode, assume it's a city name (any other value)
    return 'address';
};
  


  
  