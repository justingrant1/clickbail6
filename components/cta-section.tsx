import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock } from 'lucide-react';
import Link from 'next/link';

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-red-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-purple-200">
            <Shield className="h-5 w-5 mr-2" />
            <span className="font-medium">Risk-Free Trial • No Credit Card Required</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Ready to Transform 
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Your Business?
            </span>
          </h2>
          
          <p className="text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of bail bond companies who have already modernized their operations 
            with Clickbail. Start your free trial today and see the difference in 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/start-trial">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-purple-200">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>Setup in under 24 hours</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-5 w-5 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection; 