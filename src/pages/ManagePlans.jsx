// ManagePlans.jsx
import { useState } from 'react';
import {
  Plus,
  Star,
  Edit2,
  Trash2,
  Download,
  MoreVertical,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlans } from './PlansContext';

const ManagePlans = () => {
  const navigate = useNavigate();
  const { plans, setCurrentPlan, deletePlan, addPlan } = usePlans();
  const [showNewPlanDialog, setShowNewPlanDialog] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const handleSetCurrentPlan = (planId) => {
    setCurrentPlan(planId);
    setActiveDropdownId(null);
  };

  const handleDeletePlan = (planId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this plan?'
    );
    if (confirmed) {
      deletePlan(planId);
    }
    setActiveDropdownId(null);
  };

  const handleCreateNewPlan = () => {
    if (!newPlanName.trim()) {
      alert('Please enter a plan name');
      return;
    }

    const newPlan = {
      id: Math.max(...plans.map((p) => p.id)) + 1,
      name: newPlanName,
      isCurrentPlan: false,
      totalCredits: 124,
      completedCredits: 0,
      expectedGraduation: 'TBD',
      semesters: [],
    };

    addPlan(newPlan);
    setNewPlanName('');
    setShowNewPlanDialog(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-black to-gray-800 px-8 py-6 flex justify-between items-center">
            <h1 className="text-white text-2xl font-bold">
              Manage Degree Plans
            </h1>
            <button
              onClick={() => setShowNewPlanDialog(true)}
              className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Plan
            </button>
          </div>

          <div className="p-8">
            {/* Description Card */}
            <div className="mb-8 bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-lg border border-gray-700 p-6 shadow-lg">
              <h2 className="text-lg font-medium text-white mb-2">
                About Manage Plans
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                Use this space to create, organize, and explore different degree
                plans. Add new plans, edit existing ones, or experiment with
                various paths to see what works best for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className="backdrop-blur-sm bg-white/5 rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors"
                >
                  <div className="px-6 py-4 bg-gradient-to-r from-gray-800/50 to-black/50 flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        {plan.isCurrentPlan && (
                          <Star className="w-5 h-5 text-yellow-500 mr-2 fill-current" />
                        )}
                        <h3 className="text-lg font-medium text-white truncate">
                          {plan.name}
                        </h3>
                      </div>
                      {plan.isCurrentPlan && (
                        <span className="text-sm text-gray-400 mt-1">
                          Starred
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveDropdownId(
                            activeDropdownId === plan.id ? null : plan.id
                          )
                        }
                        className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>

                      {activeDropdownId === plan.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700 z-10">
                          {!plan.isCurrentPlan && (
                            <button
                              onClick={() => handleSetCurrentPlan(plan.id)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                            >
                              <Check className="w-4 h-4 mr-2" />
                              Star Plan
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setActiveDropdownId(null);
                              navigate(`/plan-editor/${plan.id}`);
                            }}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePlan(plan.id)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-400">
                          Credits Progress
                        </p>
                        <p className="text-lg text-white">
                          {plan.completedCredits} / {plan.totalCredits}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">
                        Expected Graduation
                      </p>
                      <p className="text-lg text-white">
                        {plan.expectedGraduation}
                      </p>
                    </div>

                    <div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              (plan.completedCredits / plan.totalCredits) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {Math.round(
                          (plan.completedCredits / plan.totalCredits) * 100
                        )}
                        % Complete
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showNewPlanDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg shadow-xl border border-gray-700 w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Create New Plan
            </h2>
            <input
              type="text"
              placeholder="Enter plan name"
              value={newPlanName}
              onChange={(e) => setNewPlanName(e.target.value)}
              className="block w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-150 ease-in-out mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowNewPlanDialog(false);
                  setNewPlanName('');
                }}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNewPlan}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlans;
