import React from "react";

const teamMembers = [

  {
    name: "Binam Kayastha",
    role: "Mentor",
    image: "/README-photos/binamkayastha.png",
    bio: "Binam Kayastha is a Senior Software engineer with six years of industry experience. Originally from Nepal, he is currently working in Boston, USA as a Platform Engineer at Cirkul. Binam is a true full-stack developer with experience spanning DevOps, data engineering, back-end, and front-end. In his free time, he loves tinkering with new technologies, developing his own productivity apps, building games, and competing in hackathons."
  },
  {
    name: "Christina Kayastha",
    role: "Mentor",
    image: "/README-photos/christinakayastha.png",
    bio: "Christina Kayastha is a Principal Software Engineer with nearly a decade of industry experience. Originally from Nepal, she is currently working in Boston, USA as a Domain Architect leading innovation initiatives at Vista. Christina is an inventor on 11 patents, has given 50+ conference talks. In her free time, she loves nerding out about emerging tech, building interactive art installations, and is an active leader in her local cultural and tech communities."
  },

  {
    name: "Hemanta Bhandari",
    role: "Peer Mentor",
    image: "/README-photos/hemsbhandari.jpg",
    bio: "Hemanta (Hems) is a Budhanilkantha School alumnus with a passion for both mathematics and computer science, seamlessly blending theory with practical applications. He has a keen interest in applied mathematics and building full-stack web applications. In his free time, he enjoys playing chess and basketball, as well as expressing his creativity through sketching."
  },

  {
    name: "Aanchal Nancy Jha",
    role: "Mentee",
    image: "/README-photos/Nancy.png",
    bio: "Aanchal Nancy Jha is a high school graduate and a passionate coding enthusiast. She enjoys learning new programming languages, frameworks, and technologies. Her hobbies include creating mini-games and side projects, making coding tutorials on YouTube, reading tech blogs, and competing in hackathons. Nancy is always eager to learn and take on new challenges."
  },

  {
    name: "Aditya Bikram Thakur",
    role: "Mentee",
    image: "/README-photos/aditya.jpeg",
    bio: "Aditya Bikram Thakur is a senior A-levels student at Budhanilkantha School. He is interested in various aspects of computer science such as Data structures and algorithms, web development, and Deep learning. His hobbies include listening to audiobooks, going on a morning stroll, learning Japanese, and watching movies."
  },

  {
    name: "Devaki Rawal",
    role: "Mentee",
    image: "/README-photos/devakirawal.jpeg",
    bio: "Devaki Rawal is a high school graduate and a tech enthusiast, always eager to spread digital literacy programs. In her free time, she loves teaching children. She challenges herself every day to become one step better than yesterday. Devaki enjoys traveling, watching Shark Tank, and teaching. She is always open to learning and exploring new things every day."
  },

  {
    name: "Puja Tajpuriya",
    role: "Mentee",
    image: "/README-photos/puja.png",
    bio: "Puja Tajpuriya, a high school graduate with a deep passion for creativity and technology, is embarking on an exciting journey into programming. Alongside her hobbies of crafting poetry, singing melodies, and exploring zenart, she is passionately diving into the dynamic world of coding. She is committed to mastering programming fundamentals and leveraging her diverse interests to inspire unique projects. With a keen eye for detail and a natural flair for expression."
  },

  {
    name: "Sanskar Lamsal",
    role: "Mentee",
    image: "/README-photos/sanskar.jpg",
    bio: "Sanskar Lamsal is a high school graduate. His hobbies include watching movies and TV series, participating in hackathons, and listening to music and podcasts. He has a keen interest in design and programming and enjoys creating things that matter. In his free time, he mostly hangs out with friends and family, works on side projects, or explores new interests."
  },

  {
    name: "Saphal Upreti",
    role: "Mentee",
    image: "/README-photos/saphalupreti.jpg",
    bio: "Saphal Upreti is an incoming freshman at Mississippi State University, double majoring in Computer Science and Business. His hobbies include watching movies, gaming, occasionally listening and producing music, and participating in hackathons. In his free time, he likes to work on different side projects and spend time with his friends and family."
  },
  
];

const About: React.FC = () => {
  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Incubate Nepal</h1>
      <p className="mb-8 text-lg leading-relaxed">
        Incubate Nepal is an 8-week virtual program that connects students from all over Nepal to collaborate on open-ended projects. These students are matched with accomplished mentors as they navigate through their projects in small teams. Students will need to think creatively, deeply, and collaboratively as they write papers or prototype apps during the program. Mentors and guest speakers will also provide guidance on the US college admission process, as well as career advice in research and entrepreneurship. Incubate Nepal is completely free and available to students who have completed Grade 11 or Grade 12, and not yet enrolled in university.
        <br />
        This program was founded by a group of MIT and Harvard graduates to make project-based learning more accessible to students in Nepal. In addition to connecting students from all over Nepal, this virtual program offers mentorship and exposure to open-ended projects.
        <br />
        <a href="https://www.incubatenepal.com/" className="text-blue-600 hover:underline">
          Learn more about Incubate Nepal
        </a>
      </p>

      <h1 className="text-4xl font-bold mb-6 text-center">Nepalingo</h1>
      <p className="mb-8 text-lg leading-relaxed">
        Nepalingo is a project under Incubate Nepal. Since 1795, 61% of native languages across the world have already been lost, and many of Nepal's 100 indigenous languages have also been identified as at risk. Nepalingo.com aims to help preserve these languages and with them our stories, songs, history, and culture. We take the work of linguists who have already expended great efforts accumulating the knowledge of these languages into dictionaries and make that information easier to learn and remember. In doing so, we hope to help new generations connect with their elders and reconnect with their heritage.
      </p>

      <h2 className="text-3xl font-semibold mb-6 text-center">Team Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
         <div
         key={index}
         className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-lg border border-gray-200 hover:bg-[#D03641] hover:shadow-xl transition-all duration-300"
       >
         <img
           src={member.image}
           alt={member.name}
           className="h-32 w-32 rounded-full mb-4 object-cover"
         />
         <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
         <p className="text-sm text-black-800 mb-4">{member.role}</p>
         <p className="text-sm text-gray-700">{member.bio}</p>
       </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="https://github.com/nepalcodes/nepalingo" className="text-blue-600 hover:underline mx-2">
          GitHub Project
        </a>
        <a href="https://github.com/nepalcodes/nepalingo" className="text-blue-600 hover:underline mx-2">
          GitHub Repo
        </a>
      </div>
    </div>
  );
};

export default About;
