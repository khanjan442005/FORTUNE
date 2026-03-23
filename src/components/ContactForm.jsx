import { useState } from "react"
import { motion } from "framer-motion"

function ContactForm(){
  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [email,setEmail] = useState("")
  const [message,setMessage] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  function handleSubmit(e){
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      alert("Enquiry Sent Successfully! We will contact you soon.")
      setName("")
      setPhone("")
      setEmail("")
      setMessage("")
      setSubmitted(false)
    }, 500)
  }

  const inputFields = [
    { label: "Name", value: name, setValue: setName, type: "text", placeholder: "Your Name", icon: "👤" },
    { label: "Phone", value: phone, setValue: setPhone, type: "tel", placeholder: "Your Phone", icon: "📞" },
    { label: "Email", value: email, setValue: setEmail, type: "email", placeholder: "Your Email", icon: "✉️" }
  ]

  return(
    <div id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="inline-block px-4 py-1.5 bg-blue-500/20 rounded-full text-blue-400 font-medium text-sm mb-4"
          >
            Contact Us
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Touch</span></h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">Ready to transform your home? Contact us for a free consultation and quote</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="text-white">
            <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
            <div className="space-y-5">
              {[
                { icon: "📍", title: "Address", desc: "123 Window Street, City Center" },
                { icon: "📞", title: "Phone", desc: "+91 98765 43210" },
                { icon: "✉️", title: "Email", desc: "info@dynamicwindows.com" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{opacity: 0, x: -30}}
                  whileInView={{opacity: 1, x: 0}}
                  viewport={{once: true}}
                  transition={{delay: i * 0.1}}
                  whileHover={{x: 10, scale: 1.02}}
                  className="flex items-center gap-5 p-5 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <p className="font-semibold text-blue-300">{item.title}</p>
                    <p className="text-slate-300 group-hover:text-white transition-colors">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.4}}
              className="mt-10 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50"
            >
              <h4 className="text-xl font-bold mb-4">Business Hours</h4>
              <div className="space-y-2">
                <p className="text-slate-300 flex justify-between"><span>Monday - Saturday</span><span className="text-blue-400">9:00 AM - 7:00 PM</span></p>
                <p className="text-slate-300 flex justify-between"><span>Sunday</span><span className="text-red-400">Closed</span></p>
              </div>
            </motion.div>
          </div>

          <motion.form 
            onSubmit={handleSubmit}
            initial={{opacity: 0, y: 30}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500"></div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {inputFields.map((field, i) => (
                <motion.div 
                  key={i}
                  initial={{opacity: 0, y: 20}}
                  whileInView={{opacity: 1, y: 0}}
                  viewport={{once: true}}
                  transition={{delay: i * 0.1}}
                >
                  <label className="block text-blue-300 font-semibold mb-3 flex items-center gap-2">
                    <span>{field.icon}</span> {field.label}
                  </label>
                  <div className="relative">
                    <input 
                      value={field.value} 
                      onChange={(e)=>field.setValue(e.target.value)} 
                      placeholder={field.placeholder} 
                      type={field.type} 
                      required 
                      onFocus={() => setFocused(i)}
                      onBlur={() => setFocused(null)}
                      className={`w-full bg-slate-800/50 border text-white p-4 rounded-xl focus:outline-none transition-all ${
                        focused === i 
                          ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    />
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 ${focused === i ? 'opacity-100' : ''}`}></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0.3}}
              className="mb-8"
            >
              <label className="block text-blue-300 font-semibold mb-3 flex items-center gap-2">
                <span>💬</span> Message
              </label>
              <textarea 
                value={message} 
                onChange={(e)=>setMessage(e.target.value)} 
                placeholder="Tell us about your requirements..." 
                required 
                rows="4" 
                onFocus={() => setFocused(3)}
                onBlur={() => setFocused(null)}
                className={`w-full bg-slate-800/50 border text-white p-4 rounded-xl focus:outline-none transition-all ${
                  focused === 3 
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                    : 'border-slate-600 hover:border-slate-500'
                }`}
              />
            </motion.div>

            <motion.button 
              type="submit"
              disabled={submitted}
              whileHover={{scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"}}
              whileTap={{scale: 0.98}}
              className={`w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-5 rounded-xl transition-all shadow-lg shadow-blue-500/30 ${
                submitted ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {submitted ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Enquiry
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
