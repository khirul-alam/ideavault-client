import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import axios from "axios";
import IdeaCard from "../components/IdeaCard";
import useTitle from "../hooks/useTitle";
const Home = () => {
  useTitle("Home");
  const [trendingIdeas, setTrendingIdeas] = useState([]); 


  useEffect(() => {
    axios.get("https://ideavault-server-one.vercel.app/ideas/trending")
      .then(res => setTrendingIdeas(res.data));
  }, []);

  const slides = [
    {
      title: "Share Your Startup Ideas",
      subtitle: "Turn your vision into reality. Share, explore, and validate innovative startup ideas with a community of creators.",
      bg: "from-purple-900 to-indigo-900",
      img: "https://i.ibb.co/placeholder1.png",
    },
    {
      title: "Collaborate & Innovate",
      subtitle: "Connect with like-minded entrepreneurs. Get feedback, refine your ideas, and build something amazing together.",
      bg: "from-blue-900 to-cyan-900",
      img: "https://i.ibb.co/placeholder2.png",
    },
    {
      title: "Discover Trending Ideas",
      subtitle: "Explore the hottest startup ideas across Tech, AI, Health, Education and more categories.",
      bg: "from-emerald-900 to-teal-900",
      img: "https://i.ibb.co/placeholder3.png",
    },
  ];

  return (
    <div>
      {/* ===== BANNER ===== */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className={`bg-gradient-to-r ${slide.bg} min-h-[550px] flex items-center`}>
              <div className="max-w-6xl mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                  {slide.subtitle}
                </p>
                <Link
                  to="/ideas"
                  className="btn btn-primary btn-lg px-10"
                >
                  Explore Ideas 🚀
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ===== TRENDING IDEAS ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">🔥 Trending Ideas</h2>
          <p className="text-base-content/60 text-lg">
            Explore the most exciting startup ideas from our community
          </p>
        </div>

        {trendingIdeas.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">💡</p>
            <p className="text-xl text-base-content/60">
              No ideas yet. Be the first to share!
            </p>
            <Link to="/add-idea" className="btn btn-primary mt-6">
              Add First Idea
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingIdeas.map(idea => (
                <IdeaCard key={idea._id} idea={idea} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/ideas" className="btn btn-outline btn-primary btn-lg">
                View All Ideas →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-base-200 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">⚙️ How It Works</h2>
            <p className="text-base-content/60 text-lg">
              Three simple steps to share your idea
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "✍️", step: "01", title: "Submit Your Idea", desc: "Fill out a simple form with your startup concept, problem statement, and proposed solution." },
              { icon: "🌍", step: "02", title: "Get Community Feedback", desc: "Share with thousands of entrepreneurs. Get valuable comments and insights from the community." },
              { icon: "🚀", step: "03", title: "Refine & Launch", desc: "Use feedback to improve your idea. Connect with potential co-founders and investors." },
            ].map((item, i) => (
              <div key={i} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                <div className="card-body text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="badge badge-primary badge-lg mb-2">Step {item.step}</div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-base-content/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">📂 Browse by Category</h2>
          <p className="text-base-content/60 text-lg">
            Find ideas in your area of interest
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: "Tech", icon: "💻", color: "bg-blue-500/10 hover:bg-blue-500/20" },
            { name: "Health", icon: "🏥", color: "bg-green-500/10 hover:bg-green-500/20" },
            { name: "AI", icon: "🤖", color: "bg-purple-500/10 hover:bg-purple-500/20" },
            { name: "Education", icon: "📚", color: "bg-yellow-500/10 hover:bg-yellow-500/20" },
            { name: "Finance", icon: "💰", color: "bg-emerald-500/10 hover:bg-emerald-500/20" },
            { name: "Other", icon: "🌟", color: "bg-pink-500/10 hover:bg-pink-500/20" },
          ].map((cat, i) => (
            <Link
              key={i}
              to={`/ideas?category=${cat.name}`}
              className={`${cat.color} rounded-2xl p-6 text-center cursor-pointer transition-all hover:scale-105`}
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <div className="font-semibold">{cat.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Share Your Idea? 💡
          </h2>
          <p className="text-white/80 text-xl mb-10">
            Join thousands of innovators and entrepreneurs. Your next big idea could change the world!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/add-idea" className="btn btn-white btn-lg text-purple-600">
              Share Your Idea
            </Link>
            <Link to="/ideas" className="btn btn-outline btn-white btn-lg">
              Explore Ideas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;