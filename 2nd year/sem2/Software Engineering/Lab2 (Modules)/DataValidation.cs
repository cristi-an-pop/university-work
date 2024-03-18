using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataValidationModule
{
    public class DataValidation
    {
        public static bool ValidateEmail(string email)
        {
            string sanitisedEmail = SanitizeInput(email);
            if (string.IsNullOrWhiteSpace(sanitisedEmail))
                return false;

            // Check for the presence of '@' character and character '@' not the first character
            // Format of email : [min 1 char]@[min 1 char].[min 1 char] 
            int atIndex = sanitisedEmail.IndexOf('@');
            if (atIndex == -1 || atIndex == 0)
                return false;

            // Check for the presence of '.' character after '@' and if there are characters after '.'
            // Format of email : [min 1 char]@[min 1 char].[min 1 char]
            int dotIndex = sanitisedEmail.IndexOf('.', atIndex);
            if (dotIndex < 2 || dotIndex == sanitisedEmail.Length - 1)
                return false;

            return true;
        }

        public static bool ValidatePhoneNumber(string phoneNumber)
        {
            string sanitisedPhoneNumber = SanitizeInput(phoneNumber);
            if (string.IsNullOrWhiteSpace(sanitisedPhoneNumber))
                return false;

            // Check if all characters are digits
            foreach (char c in sanitisedPhoneNumber)
            {
                if (!char.IsDigit(c))
                    return false;
            }

            // Check if remaining length is 10
            return sanitisedPhoneNumber.Length == 10;
        }

        public static bool ValidateBirthDate(string birthDate)
        {
            string sanitisedBirthDate = SanitizeInput(birthDate);
            if (string.IsNullOrWhiteSpace(sanitisedBirthDate))
            {
                return false;
            }

            string[] formats = { "dd/MM/yyyy" };

            // Attempt to parse the date
            if (DateTime.TryParseExact(sanitisedBirthDate, formats, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                // Check if the parsed date is a reasonable birth date (not in the future and not too far in the past)
                DateTime currentDate = DateTime.UtcNow;
                DateTime minBirthDate = currentDate.AddYears(-150); // Allowing for very old birth dates
                DateTime maxBirthDate = currentDate.AddYears(-13);  // Restricting to ages above 13

                // Ensure the parsed date is within the valid range
                if (parsedDate >= minBirthDate && parsedDate <= maxBirthDate)
                {
                    return true;
                }
            }

            return false;

        }

        private static string SanitizeInput(string input)
        {
            // Replace single quote with double single quotes to escape them and treat them as literal characters not SQL syntax
            return input.Replace("'", "''");
        }
    }
}
