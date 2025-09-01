import { Container } from '../lib/ui-core'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <Container>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            React Components Template
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to the React Components Template with ui-core integration
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ✅ Container Component Working
            </h2>
            <p className="text-gray-600">
              This content is wrapped in a ui-core Container component, which provides:
            </p>
            <ul className="text-left mt-4 space-y-2 text-gray-700">
              <li>• Responsive horizontal centering (mx-auto)</li>
              <li>• Responsive padding (px-4 sm:px-6 lg:px-8)</li> 
              <li>• Maximum width constraint (max-w-7xl)</li>
              <li>• Standard layout container functionality</li>
            </ul>
          </div>
          <div className="mt-8">
            <a 
              href="/examples" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View Examples →
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}