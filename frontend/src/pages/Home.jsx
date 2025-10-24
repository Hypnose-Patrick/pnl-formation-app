/**
 * Home Page
 * Landing page for ProfilPro 5D
 */

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-600">ProfilPro 5D</h1>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Connexion
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Inscription</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Découvrez votre Profil Professionnel <span className="text-primary-600">5D</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Une analyse multidimensionnelle unique combinant 5 modèles de profiling pour révéler
              votre potentiel professionnel complet.
            </p>
            <Link to="/register">
              <Button size="lg" className="px-8">
                Créer mon profil gratuitement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5 Dimensions Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h3 className="text-3xl font-bold text-center mb-12">Les 5 Dimensions de votre Profil</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* DISC */}
            <div className="card">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">DISC</h4>
              <p className="text-gray-600">
                Analysez votre comportement professionnel à travers les 4 dimensions : Dominance,
                Influence, Stabilité et Conformité.
              </p>
            </div>

            {/* RIASEC */}
            <div className="card">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">RIASEC</h4>
              <p className="text-gray-600">
                Identifiez vos intérêts professionnels selon le modèle Holland : Réaliste,
                Investigateur, Artistique, Social, Entreprenant, Conventionnel.
              </p>
            </div>

            {/* Ennéagramme */}
            <div className="card">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Ennéagramme</h4>
              <p className="text-gray-600">
                Découvrez votre type de personnalité parmi les 9 profils de l'Ennéagramme et
                comprenez vos motivations profondes.
              </p>
            </div>

            {/* Astrologie Occidentale */}
            <div className="card">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Astrologie Occidentale</h4>
              <p className="text-gray-600">
                Explorez votre thème astral et comprenez l'influence de votre signe solaire, lunaire
                et ascendant sur votre carrière.
              </p>
            </div>

            {/* Astrologie Tibétaine */}
            <div className="card">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔮</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Astrologie Tibétaine</h4>
              <p className="text-gray-600">
                Intégrez la sagesse de l'astrologie tibétaine (Byung-rtsis) avec l'analyse de votre
                élément et animal.
              </p>
            </div>

            {/* Synthèse */}
            <div className="card bg-primary-50 border-2 border-primary-200">
              <div className="w-12 h-12 bg-primary-200 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="text-xl font-semibold mb-2">Synthèse Unique</h4>
              <p className="text-gray-600">
                Un rapport complet de 2 pages combinant les 5 dimensions pour une vision holistique
                de votre profil professionnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h3 className="text-3xl font-bold mb-4">Prêt à découvrir votre potentiel ?</h3>
          <p className="text-xl mb-8 opacity-90">
            Complétez notre questionnaire de 15 minutes et recevez votre profil détaillé.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
              Commencer maintenant
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-custom text-center">
          <p className="text-gray-400">© 2025 ProfilPro 5D. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
