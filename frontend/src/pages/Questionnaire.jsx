/**
 * Questionnaire Page
 * Main questionnaire interface
 */

import React from 'react';
import { Link } from 'react-router-dom';

function Questionnaire() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <Link to="/profile">
            <h1 className="text-2xl font-bold text-primary-600">ProfilPro 5D</h1>
          </Link>
        </div>
      </header>

      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <h2 className="text-3xl font-bold mb-4">Questionnaire ProfilPro 5D</h2>
            <p className="text-gray-600 mb-6">
              Répondez à 35 questions pour générer votre profil professionnel multidimensionnel.
              Durée estimée : 15 minutes.
            </p>

            <div className="bg-primary-50 border-l-4 border-primary-600 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong>Instructions :</strong> Choisissez la réponse qui correspond le mieux à
                votre comportement naturel au travail. Il n'y a pas de bonne ou mauvaise réponse.
              </p>
            </div>

            {/* TODO: Implement QuestionnaireForm component */}
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Le questionnaire sera implémenté ici.</p>
              <Link
                to="/profile"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Voir le profil (démo)
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;
