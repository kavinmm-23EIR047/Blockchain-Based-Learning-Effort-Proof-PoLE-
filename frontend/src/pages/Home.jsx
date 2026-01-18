export default function Home() {
  return (
    <div className="min-h-screen bg-white">
    

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Blockchain Student Achievement Verification
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Verify any student achievement instantly using Blockchain ID or QR Code. Secure, transparent, and tamper-proof credentials.
        </p>
        <div className="flex gap-4 justify-center">
            <a
    href="/verify"
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
  >
    Verify Achievement
  </a>
          <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-lg border-2 border-gray-300 transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">🔐</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Secure & Immutable
                </h3>
                <p className="text-gray-600 mb-4">
                  All achievements stored on blockchain, ensuring tamper-proof and permanent records.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">⚡</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Instant Verification
                </h3>
                <p className="text-gray-600 mb-4">
                  Verify credentials in seconds using Student ID or QR code scanning technology.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl">🌐</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Globally Accessible
                </h3>
                <p className="text-gray-600 mb-4">
                  Access and verify achievements from anywhere in the world, anytime.
                </p>
              </div>
            </div>

          </div>

          <div className="text-center mt-12">
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg">
              Explore All Features →
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center text-blue-600 mb-16">
          How It Works
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Complete Achievement</h4>
                <p className="text-gray-600">Students complete achievements and take verification quizzes</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Upload to IPFS</h4>
                <p className="text-gray-600">Certificates are uploaded and stored on IPFS</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Blockchain Record</h4>
                <p className="text-gray-600">Achievement data is recorded on Kava blockchain</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Instant Verification</h4>
                <p className="text-gray-600">HR and employers can instantly verify credentials</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <span className="text-8xl block mb-4">📱</span>
              <p className="text-gray-500 text-lg">Verification Interface Demo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Powered By Section */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-600 mb-2">Powered by</p>
          <p className="text-3xl font-bold text-blue-600 mb-2">Kava Blockchain</p>
          <p className="text-gray-600">Decentralized • Secure • Transparent</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gray-600">
            Transforming credential verification with blockchain technology
          </p>
        </div>
      </footer>

    </div>
  );
}