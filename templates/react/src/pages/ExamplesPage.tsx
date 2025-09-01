import { Container } from '../lib/ui-core/components/layouts'
import { StandardBackgroundVideo, StandardVideoPlayer } from '../lib/ui-core/components/video'

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12">
      <Container>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            UI-Core Examples
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            This page will showcase all ui-core components in standard React
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🚧 Coming Soon (Task 5)
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold text-lg mb-3">Layout Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• BentoLayout with GridItems</li>
                  <li>• Container (already working!)</li>
                  <li>• CardCarousel</li>
                  <li>• GridContainer</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Card Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• GradientCard with theme colors</li>
                  <li>• ProjectCard with content data</li>
                  <li>• ArticleCard with img defaults</li>
                  <li>• QuoteCard with styling</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">UI Components</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• TechnologyScroller</li>
                  <li>• ThemeToggle</li>
                  <li>• ColorSelector</li>
                  <li>• CosineTerrainCard (3D)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Coming in Task 7-9</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• VideoCard with StandardBackgroundVideo</li>
                  <li>• Background video autoplay</li>
                  <li>• Cross-browser video support</li>
                  <li>• Framework-agnostic video players</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Video Components Demo */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              🎬 Video Components Demo
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Background Video Example */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-3">StandardBackgroundVideo</h3>
                <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden relative">
                  <StandardBackgroundVideo
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    autoplay={true}
                    className="rounded-lg"
                  >
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="text-white text-center">
                        <h4 className="text-lg font-semibold">Background Video Mode</h4>
                        <p className="text-sm opacity-90">Autoplay, looped, muted</p>
                      </div>
                    </div>
                  </StandardBackgroundVideo>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  ✅ Framework-agnostic background video with autoplay handling
                </p>
              </div>
              
              {/* Video Player Example */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-3">StandardVideoPlayer</h3>
                <div className="w-full h-48 bg-gray-900 rounded-lg overflow-hidden">
                  <StandardVideoPlayer
                    url="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                    title="Sample Video"
                    controls={true}
                    className="rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  ✅ Custom video player with seek bar, time display, and controls
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <a 
              href="/" 
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </Container>
    </div>
  )
}