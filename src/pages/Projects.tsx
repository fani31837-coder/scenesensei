import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useAuthStore from '@/stores/authStore'
import useEditorStore from '@/stores/editorStore'
import { projectAPI, sceneAPI } from '@/services/api'
import { Project, Scene } from '@/types'
import { v4 as uuid } from 'uuid'

const Projects: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { createScene } = useEditorStore()
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    setIsLoading(true)
    try {
      const response = await projectAPI.list()
      setProjects(response.data)
    } catch {
      console.error('Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return

    // Fallback owner id for demo/local mode if no authenticated user
    const ownerId = user?.id || 'user-1'

    const newProject: Project = {
      id: uuid(),
      name: newProjectName,
      description: '',
      scenes: [],
      ownerId,
      collaborators: [],
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    try {
      // Await the API call and use returned project to update UI immediately
      const res = await projectAPI.create(newProject)
      const created = res.data ?? newProject
      setNewProjectName('')
      // Optimistically update list without waiting for full reload
      setProjects((prev) => [created as Project, ...prev])
    } catch (err) {
      console.error('Failed to create project', err)
      // Keep user informed via console; UI error handling could be added here
    }
  }

  const handleOpenProject = (project: Project) => {
    if (project.scenes.length > 0) {
      navigate(`/editor/${project.scenes[0].id}`)
    } else {
      // Create a new scene in the project
      const newScene: Scene = {
        id: uuid(),
        name: 'Scene 1',
        duration: 10,
        fps: 30,
        width: 1920,
        height: 1080,
        tracks: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      sceneAPI.create(newScene)
      navigate(`/editor/${newScene.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t('app.name')}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user?.email}</span>
            <button
              onClick={() => logout()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              {t('nav.logout')}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">{t('nav.projects')}</h2>

          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Project name"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleCreateProject()}
              />
              <button
                onClick={handleCreateProject}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-gray-400">Loading...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => handleOpenProject(project)}
                className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 cursor-pointer transition"
              >
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-sm text-gray-400 mb-4">{project.description || 'No description'}</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>{project.scenes.length} scenes</span>
                  <span>{project.collaborators.length} collaborators</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects
