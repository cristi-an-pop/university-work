using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FeatureToggleModule
{
    internal class FeatureToggle
    {

        private Dictionary<string, bool> featuresFlags;

        public FeatureToggle()
        {
            featuresFlags = new Dictionary<string, bool>();
        }

        public void AddFeature(string featureName, bool isEnabled = false)
        {
            if (!featuresFlags.ContainsKey(featureName))
            {
                featuresFlags.Add(featureName, isEnabled);
            }
            else
            {
                throw new Exception($"Feature '{featureName}' already exists");
            }
        }

        public bool IsEnabled(string featureName)
        {
            if (!featuresFlags.ContainsKey(featureName))
            {
                throw new Exception($"Feature '{featureName}' does not exist");
            }

            return featuresFlags[featureName];
        }

        public void EnableFeature(string featureName)
        {
            if (!featuresFlags.ContainsKey(featureName))
            {
                throw new Exception($"Feature '{featureName}' does not exist");
            }

            featuresFlags[featureName] = true;

        }

        public void DisableFeature(string featureName)
        {
            if (!featuresFlags.ContainsKey(featureName))
            {
                throw new Exception($"Feature '{featureName}' does not exist");
            }

            featuresFlags[featureName] = false;
        }
    }
}
