// Sofia Deichert
import React, { createContext, useContext, useState } from 'react';

const initialPlans = [
  {
    id: 1,
    name: 'Computer Science BS',
    isCurrentPlan: true,
    totalCredits: 124,
    completedCredits: 0,
    expectedGraduation: 'Spring 2028',
    semesters: [
      {
        id: 1,
        name: 'Fall 2024',
        courses: [],
      },
      {
        id: 2,
        name: 'Spring 2025',
        courses: [],
      },
      {
        id: 3,
        name: 'Fall 2025',
        courses: [],
      },
      {
        id: 4,
        name: 'Spring 2026',
        courses: [],
      },
    ],
  },
];

const PlansContext = createContext();

export const PlansProvider = ({ children }) => {
  const [plans, setPlans] = useState(initialPlans);

  const updatePlan = (updatedPlan) => {
    setPlans(
      plans.map((plan) => (plan.id === updatedPlan.id ? updatedPlan : plan))
    );
  };

  const deletePlan = (planId) => {
    setPlans(plans.filter((plan) => plan.id !== planId));
  };

  const addPlan = (newPlan) => {
    setPlans([...plans, newPlan]);
  };

  const setCurrentPlan = (planId) => {
    setPlans(
      plans.map((plan) => ({
        ...plan,
        isCurrentPlan: plan.id === planId,
      }))
    );
  };

  const getPlan = (planId) => {
    return plans.find((plan) => plan.id === planId);
  };

  const value = {
    plans,
    updatePlan,
    deletePlan,
    addPlan,
    setCurrentPlan,
    getPlan,
  };

  return (
    <PlansContext.Provider value={value}>{children}</PlansContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlansContext);
  if (!context) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
};
