'use client'

import { useState } from 'react'

export default function AIFriendBuilder() {
  const [friendName, setFriendName] = useState('')
  const [personality, setPersonality] = useState('Friendly')
  const [color, setColor] = useState('#4F46E5')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b p-4">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <span className="text-4xl mr-3">🎮</span>
          AI Playground
        </h1>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-blue-100 p-4 rounded-lg mb-6 flex items-start space-x-4">
          <div className="text-4xl">🤖</div>
          <div>
            <p className="text-gray-800">
              Welcome to the AI Playground! This is where you can have fun, create, and 
              explore interactive AI experiences. Choose an activity below to get started!
            </p>
          </div>
        </div>

        <div className="flex space-x-1 mb-6 bg-white rounded-lg p-1">
          <button className="px-4 py-2 text-sm font-medium text-gray-600">🗺️ Adventure Map</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600">🏆 Achievements</button>
          <button className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-md">🤖 AI Friend Builder</button>
          <button className="px-4 py-2 text-sm font-medium text-gray-600">🧪 Experiment Lab</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Build Your AI Friend</h2>
            <p className="text-gray-600 mb-6">Create your very own AI friend! Customize how they look and behave.</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name your AI friend</label>
                <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter a name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose a personality</label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Friendly">Friendly</option>
                  <option value="Curious">Curious</option>
                  <option value="Helpful">Helpful</option>
                  <option value="Playful">Playful</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pick your friend's favorite color</label>
                <div className="flex space-x-3">
                  {['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-12 h-12 rounded-lg border-2 ${color === c ? 'border-gray-800' : 'border-gray-300'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Your AI Friend Preview</h3>
            <div className="border-2 border-blue-200 rounded-lg p-8 text-center">
              <div 
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
                style={{ backgroundColor: color }}
              >
                🤖
              </div>
              <h4 className="text-xl font-bold text-blue-700 mb-2">
                {friendName || 'Your Friend'}
              </h4>
              <p className="text-gray-600">Personality: {personality}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
