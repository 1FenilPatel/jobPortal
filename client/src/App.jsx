import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import AppLayout from './layouts/AppLayout'
import LandingPage from './pages/LandingPage'
import JobListing from './pages/JobListing'
import JobPage from './Admin/JobPage'
import PostJob from './pages/PostJob'
import SavedJob from './pages/SavedJob'
import { ThemeProvider } from './components/theme-provider'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import Profile from './pages/Profile'
import CreateCompany from './components/CreateCompany'
import CompanySetUp from './Admin/CompanySetUp'
import AdminJob from './Admin/AdminJob'
import CreateJob from './Admin/CreateJob'
import Applicants from './Admin/Applicants'
import ProtectedRoute from './Admin/ProtectedRoute'
import { useEffect, useState } from 'react'
import AllAppliedJobs from './components/AllAppliedJobs'
import AdminDashboard from './SuperAdmin/AdminDashboard'

const router = createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:"/",
        element:<LandingPage/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/jobs",
        element:<JobListing/>
      },
      {
        path:"/description/:id",
        element:<JobPage/>
      },
      {
        path:"/admin/companies",
        element:<ProtectedRoute><PostJob/></ProtectedRoute>
      },
      {
        path:"/admin/companies/create",
        element:<ProtectedRoute><CreateCompany/></ProtectedRoute>
      },
      {
        path:"/admin/companies/:id",
        element:<ProtectedRoute><CompanySetUp/></ProtectedRoute>
      },
      {
        path:"/admin/job",
        element:<ProtectedRoute><AdminJob/></ProtectedRoute>
      },
      {
        path:"/admin/jobs/create",
        element:<ProtectedRoute><CreateJob/></ProtectedRoute>
      },
      {
        path:"/admin/job/:id/applicants",
        element:<ProtectedRoute><Applicants/></ProtectedRoute>
      },
      {
        path:"/saved-job",
        element:<SavedJob/>
      },
      {
        path:"/allApplied-jobs",
        element:<AllAppliedJobs/>
      },
      {
        path:"/login",
        element:<LoginPage/>
      },
      {
        path:"/signup",
        element:<SignUpPage/>
      },
      {
        path:"/superadmin-dashboard",
        element:<AdminDashboard/>
      }
    ]
  }
])

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}/>
  </ThemeProvider>
  )
}
export default App
