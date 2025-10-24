/**
 * Profile Page
 * Displays user's ProfilPro 5D profile
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuthStore } from '../store/authStore';

function Profile() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-primary-600">ProfilPro 5D</h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">Bonjour, {user?.firstName || user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="container-custom py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Votre Profil ProfilPro 5D</h2>
              <p className="text-gray-600">
                Découvrez votre profil professionnel multidimensionnel
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Export PDF</Button>
              <Button variant="outline">Export Word</Button>
            </div>
          </div>

          {/* Check if profile exists */}
          {!user?.profileGenerated ? (
            <div className="card text-center py-12">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📝</span>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Commencez votre profil</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Complétez notre questionnaire de 15 minutes pour générer votre profil professionnel
                unique basé sur 5 modèles de profiling.
              </p>
              <Link to="/questionnaire">
                <Button size="lg">Démarrer le questionnaire</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Executive Summary */}
              <div className="card mb-6">
                <h3 className="text-xl font-semibold mb-4">Résumé Exécutif</h3>
                <p className="text-gray-700 leading-relaxed">
                  Votre profil révèle une personnalité dynamique et orientée résultats, avec une
                  forte capacité de leadership et d'innovation. Votre combinaison unique de traits
                  DISC (Dominance-Influence), RIASEC (Entreprenant-Investigateur-Artistique) et
                  Ennéagramme Type 3 suggère une personne ambitieuse, créative et stratégique...
                </p>
              </div>

              {/* 5 Dimensions Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="card">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span>📊</span> DISC
                  </h4>
                  <p className="text-2xl font-bold text-primary-600 mb-1">DI</p>
                  <p className="text-sm text-gray-600">
                    Profil Dominance-Influence : Leader dynamique et persuasif
                  </p>
                </div>

                <div className="card">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span>🎯</span> RIASEC
                  </h4>
                  <p className="text-2xl font-bold text-green-600 mb-1">EIA</p>
                  <p className="text-sm text-gray-600">
                    Entreprenant-Investigateur-Artistique
                  </p>
                </div>

                <div className="card">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span>⭐</span> Ennéagramme
                  </h4>
                  <p className="text-2xl font-bold text-purple-600 mb-1">Type 3w2</p>
                  <p className="text-sm text-gray-600">Le Battant avec aile Altruiste</p>
                </div>

                <div className="card">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span>🌟</span> Astrologie
                  </h4>
                  <p className="text-2xl font-bold text-yellow-600 mb-1">Taureau</p>
                  <p className="text-sm text-gray-600">
                    Lune en Lion, Ascendant Vierge
                  </p>
                </div>

                <div className="card">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <span>🔮</span> Tibétain
                  </h4>
                  <p className="text-2xl font-bold text-red-600 mb-1">Métal-Cheval</p>
                  <p className="text-sm text-gray-600">Élément Métal, Animal Cheval</p>
                </div>
              </div>

              {/* Strengths & Development */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                  <h4 className="text-lg font-semibold mb-4 text-green-700">Points Forts</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">
                        Leadership naturel et capacité à prendre des décisions rapides
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">
                        Excellent communicateur avec une vision stratégique
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">
                        Capacité d'adaptation et résilience face aux défis
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="card">
                  <h4 className="text-lg font-semibold mb-4 text-blue-700">Axes de Développement</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span className="text-gray-700">
                        Patience dans les processus longs et méthodiques
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span className="text-gray-700">
                        Écoute active et prise en compte des émotions d'autrui
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">→</span>
                      <span className="text-gray-700">
                        Gestion du stress et tendance au perfectionnisme
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
