using DataCompressionModule;
using DataEncryptionModule;
using DataSortModule;
using DataValidationModule;
using FeatureToggleModule;

TestDataCompression.Test();
TestDataEncryption.Test();
TestDataSort.Test();
TestDataValidation.Test();
TestFeatureToggle.Test();

Console.WriteLine("All tests passed!");
