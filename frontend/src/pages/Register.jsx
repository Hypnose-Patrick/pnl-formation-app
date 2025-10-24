/**
 * Register Page
 * User registration page
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-3xl font-bold text-primary-600">ProfilPro 5D</h1>
          </Link>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">Inscription</h2>
          <p className="mt-2 text-sm text-gray-600">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
              Connectez-vous
            </Link>
          </p>
        </div>

        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
              <input type="text" required className="input" placeholder="Jean" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
              <input type="text" required className="input" placeholder="Dupont" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" required className="input" placeholder="votre@email.com" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <input type="password" required className="input" placeholder="••••••••" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance</label>
            <input type="date" required className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Heure de naissance (optionnel)</label>
            <input type="time" className="input" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ville de naissance</label>
            <input type="text" required className="input" placeholder="Geneva" />
          </div>

          <Button type="submit" fullWidth>
            Créer mon compte
          </Button>

          <div className="text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
              Retour à l'accueil
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
