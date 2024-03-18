using DataSortModule;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataValidationModule
{
    public class TestDataValidation
    {
        public static void Test()
        {
            string email = "john.doe@gmail.com";
            string wrongEmail = "@john.doe@gmail.com";
            string phoneNumber = "0717424355";
            string dateOfBirth = "12/04/2004";
            Debug.Assert(DataValidation.ValidateEmail(email) == true);
            Debug.Assert(DataValidation.ValidateEmail(wrongEmail) == false);
            Debug.Assert(DataValidation.ValidatePhoneNumber(phoneNumber) == true);
            Debug.Assert(DataValidation.ValidateBirthDate(dateOfBirth) == true);
        }
    }
}
