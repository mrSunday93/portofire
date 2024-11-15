import React from "react";
import profile from '../asset/341721-Kokushibo-Kokushibou-Upper-Moon-One-Demon-Slayer-Kimetsu-no-Yaiba-Anime-Kimetsu-no-Yaiba.jpg';

const About = () => {
    return (
        <section className="p-8">
         <div className="flex flex-col items-center">
            <img src={profile}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4"/>
            <p className="text-lg text-center">
              Hello I'm Passionate Pop mie eater with expertise in building dynamic and responsive web app
            </p>
          </div>
        </section>
    );
};

export default About;