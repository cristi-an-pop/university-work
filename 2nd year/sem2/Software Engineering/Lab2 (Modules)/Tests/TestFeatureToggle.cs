using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeatureToggleModule
{
    public class TestFeatureToggle
    {
        public static void Test()
        {
            FeatureToggle featureToggle = new FeatureToggle();
            featureToggle.AddFeature("Feature1");
            Debug.Assert(featureToggle.IsEnabled("Feature1") == false);
            featureToggle.AddFeature("Feature2", true);
            Debug.Assert(featureToggle.IsEnabled("Feature2") == true);
            featureToggle.EnableFeature("Feature1");
            Debug.Assert(featureToggle.IsEnabled("Feature1") == true);
            featureToggle.DisableFeature("Feature2");
            Debug.Assert(featureToggle.IsEnabled("Feature2") == false);
        }
    }
}
