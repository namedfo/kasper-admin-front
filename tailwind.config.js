/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'standart': '0 0 7px 0 rgba(34, 60, 80, 0.08)',
        'schedule_elem': 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
      }
    },
    fontFamily: {
      'sans': ['sans-serif', 'Montserrat']
    }
  },
  plugins: [],
}
