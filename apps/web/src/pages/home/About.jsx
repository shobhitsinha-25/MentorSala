import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About MentorSala – Student Mentorship, Career Guidance &
            Engineering Admission Counseling
          </h1>

          <p className="text-lg md:text-xl max-w-4xl mx-auto text-blue-100">
            MentorSala is an online student mentorship and career guidance
            platform helping students make informed decisions about engineering
            admissions, college selection, entrance exam preparation, career
            planning, and skill development.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Empowering Students to Make Smarter Academic & Career Decisions
          </h2>

          <p className="text-gray-700 text-lg leading-8 text-center max-w-5xl mx-auto">
            At MentorSala, we believe every student deserves the right guidance
            to unlock their full potential. Choosing the right college, career
            path, and academic strategy can be overwhelming in today's
            competitive environment. That's why MentorSala was created—to bridge
            the gap between students and experienced mentors who have
            successfully navigated the same journey.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">
              Our Mission
            </h3>

            <p className="text-gray-700 leading-7">
              To make quality mentorship accessible and affordable for every
              student by connecting them with experienced mentors, industry
              professionals, and top-performing students who can provide
              practical and personalized guidance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border">
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">
              Our Vision
            </h3>

            <p className="text-gray-700 leading-7">
              To become India's most trusted student mentorship ecosystem,
              helping millions of students achieve academic success, secure
              admissions to top colleges, and build rewarding careers.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "One-on-One Mentorship Sessions",
              "Engineering Admission Counseling",
              "JEE Main & JEE Advanced Guidance",
              "College Selection Assistance",
              "Branch Selection Guidance",
              "Career Planning & Roadmaps",
              "Skill Development Mentorship",
              "Academic Strategy & Study Planning",
            ].map((item) => (
              <div
                key={item}
                className="p-6 border rounded-xl hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{item}</h3>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-700 mt-10 max-w-4xl mx-auto">
            Our mentors include students and graduates from IITs, NITs, IIITs,
            and other leading institutions across India who help students make
            confident academic and career decisions.
          </p>
        </div>
      </section>

      {/* Why Choose MentorSala */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose MentorSala?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-xl mb-3">
                Personalized Guidance
              </h3>
              <p className="text-gray-600">
                Customized mentorship tailored to each student's goals,
                strengths, and challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-xl mb-3">
                Experienced Mentors
              </h3>
              <p className="text-gray-600">
                Learn directly from mentors who have successfully cleared
                competitive exams and built successful careers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-xl mb-3">
                Student-Centric Approach
              </h3>
              <p className="text-gray-600">
                Our focus goes beyond admissions—we support long-term academic
                and career growth.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h3 className="font-bold text-xl mb-3">
                Affordable Access
              </h3>
              <p className="text-gray-600">
                Quality mentorship made accessible for students from all
                backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Our Core Values</h2>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Transparency",
              "Student Success",
              "Continuous Learning",
              "Accessibility",
              "Innovation",
              "Integrity",
            ].map((value) => (
              <span
                key={value}
                className="bg-blue-100 text-blue-700 px-5 py-3 rounded-full font-medium"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Helping Students */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Helping Students Across India
          </h2>

          <p className="text-lg text-gray-700 leading-8">
            MentorSala supports students preparing for JEE Main, JEE Advanced,
            WBJEE, KCET, COMEDK, MHT CET, and other engineering entrance
            examinations. Our mentorship platform helps students with college
            counseling, branch selection, admission guidance, career planning,
            and skill development.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl">
                Who are the mentors on MentorSala?
              </h3>
              <p className="text-gray-600 mt-2">
                MentorSala connects students with mentors from IITs, NITs,
                IIITs, and other reputed institutions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">
                Can MentorSala help with college selection?
              </h3>
              <p className="text-gray-600 mt-2">
                Yes. Our mentors help students compare colleges, branches,
                placements, and career opportunities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">
                Does MentorSala provide JEE counseling?
              </h3>
              <p className="text-gray-600 mt-2">
                Yes. We provide guidance for JEE Main, JEE Advanced, WBJEE,
                KCET, COMEDK, and other engineering entrance exams.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-xl">
                Is MentorSala suitable for first-year engineering students?
              </h3>
              <p className="text-gray-600 mt-2">
                Absolutely. Students can receive guidance on academics,
                internships, projects, skill development, and career planning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join the MentorSala Community
          </h2>

          <p className="text-lg text-blue-100 mb-8">
            Every year, thousands of students face important academic and career
            decisions. MentorSala exists to ensure that no student has to make
            those decisions alone.
          </p>

          <p className="text-2xl font-semibold mb-8">
            Your Future. Your Decisions. Better Guidance with MentorSala.
          </p>

          <Link
            to="/mentors"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100"
          >
            Find a Mentor
          </Link>
        </div>
      </section>
    </div>
  );
}