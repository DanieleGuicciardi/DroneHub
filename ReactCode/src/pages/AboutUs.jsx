const AboutUs = () => {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-gray-400">
          Welcome to DroneHub – a personal project born from passion, precision and flight.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 text-gray-300 text-lg leading-relaxed">
        <p>
          My name is Daniele, and I’ve been piloting drones for over 2 years.
          What started as a curiosity became a deep passion and eventually a professional path.
        </p>

        <p>
          I hold an A1-A3 EU drone license and specialize in FPV flights, stabilized cinematic footage, and aerial exploration.
          Whether it’s racing, filming, or flying for fun, I’m always learning and pushing the limits of what’s possible.
        </p>

        <p>
          DroneHub was created not only as a portfolio and a store concept, but as a space to inspire others, help them get started, and share my journey.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
