import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const ref = useRef(null);
  
  return (
    <section id='contact-section' className="w-full min-h-screen  py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with animation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:text-[5rem] md:text-5xl text-4xl font-bold mb-4 bg-clip-text  "
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-black max-w-lg mx-auto"
          >
            Let's collaborate and build something amazing together. Fill out the form below and I'll get back to you as soon as possible.
          </motion.p>
        </motion.div>
        
        {/* Contact Form with staggered animation */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800 text-white bg-opacity-50 rounded-xl p-8 shadow-lg"
          >
            <form className="space-y-6">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-700 
                  
                  rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  placeholder="Your Name"
                />
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full p-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  placeholder="your@email.com"
                />
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  className="w-full p-3 bg-gray-700 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition" 
                  placeholder="Tell me about your project..."
                ></textarea>
              </motion.div>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-3 px-6 rounded-lg font-medium text-white hover:shadow-lg transition duration-300"
                >
                  Send Message
                </button>
              </motion.div>
            </form>
          </motion.div>
          
          {/* Contact Info Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8 flex flex-col justify-center"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-blue-400">Email Me</h3>
              <p className="text-gray-300">aryanabalami54@gmail.com</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-blue-400">Call Me</h3>
              <p className="text-gray-300">+977 9808922833</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 bg-opacity-50 p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-2 text-blue-400">Follow Me</h3>
              <div className="flex space-x-4 mt-2">
                {/* Social icons - add your preferred icons */}
                <a href="https://www.linkedin.com/in/aayush-balami-539233274/" className="text-gray-300 hover:text-white transition">
                  LinkedIn
                </a>
                <a href="https://github.com/Balamiayush" className="text-gray-300 hover:text-white transition">
                  GitHub
                </a>
                <a href="https://x.com/AyushtheDev" className="text-gray-300 hover:text-white transition">
                  Twitter
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;