import axios from 'axios';

const FRONTEND = 'http://localhost:5175';
const API = 'http://localhost:3000';

async function check() {
  try {
    console.log('GET /');
    const index = await axios.get(FRONTEND + '/');
    if (!index.data.includes('<div id="root"></div>')) {
      throw new Error('Root element missing in index.html');
    }
    console.log('Frontend index OK');

    console.log('POST /api/auth/login');
    const login = await axios.post(API + '/api/auth/login', { email: 'demo@scenesensei.com', password: 'demo' });
    if (!login.data || !login.data.token) throw new Error('Login failed');
    console.log('Login OK, token:', login.data.token);

    console.log('GET /api/projects');
    const projects = await axios.get(API + '/api/projects');
    if (!Array.isArray(projects.data) || projects.data.length === 0) throw new Error('No projects returned');
    const demo = projects.data.find(p => p.name && p.name.toLowerCase().includes('demo'));
    if (!demo) throw new Error('Demo project not found');
    console.log('Projects OK, demo project found:', demo.id);

    console.log('GET /api/scenes');
    const scenes = await axios.get(API + '/api/scenes');
    if (!Array.isArray(scenes.data) || scenes.data.length === 0) throw new Error('No scenes returned');
    console.log('Scenes OK, count:', scenes.data.length);

    console.log('\nSMOKE TEST: ALL CHECKS PASSED');
    process.exit(0);
  } catch (err) {
    console.error('\nSMOKE TEST FAILED:', err && err.message ? err.message : err);
    process.exit(2);
  }
}

check();
