import { Users, Play, Clock, Zap, Globe } from 'lucide-react';

const HowDoesWork = () => {
    return (
        <div className="bg-white py-20 px-6 w-full font-mono">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6 text-gray-900">
                        How Does It Work?
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Experience the future of chess with our revolutionary 3D multiplayer platform powered by real-time WebSocket technology
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                        <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Play className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Click Play</h3>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Hit the play button and instantly join our global queue system. Your journey into 3D chess begins with a single click.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                        <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Smart Matching</h3>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Our intelligent queue system instantly checks for available opponents. If someone's waiting, you're matched immediately!
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                        <div className="bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                            <Zap className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Instant Game</h3>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Game starts immediately when matched! Experience seamless real-time gameplay with zero lag through WebSocket technology.
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-10 border border-gray-200 mb-16">
                    <div className="flex items-center justify-center mb-8">
                        <Clock className="w-12 h-12 text-gray-900 mr-4" />
                        <h2 className="text-3xl font-bold text-gray-900">Queue System</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold text-sm">1</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Opponent Available</h4>
                                    <p className="text-gray-600">When you click play and someone is already in the queue, you're instantly matched and the 3D chess battle begins!</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                    <span className="text-white font-bold text-sm">2</span>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Waiting Mode</h4>
                                    <p className="text-gray-600">No one in queue? No problem! You'll wait comfortably while our system actively searches for your perfect opponent.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 rounded-2xl p-6 border border-gray-200">
                            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <Globe className="w-5 h-5 mr-2 text-gray-700" />
                                Real-Time Features
                            </h4>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
                                    WebSocket-powered instant communication
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-gray-700 rounded-full mr-3"></div>
                                    Global player pool for faster matching
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-gray-600 rounded-full mr-3"></div>
                                    Automatic reconnection handling
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                                    Live move synchronization
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

          
            </div>
        </div>
    );
};

export default HowDoesWork;