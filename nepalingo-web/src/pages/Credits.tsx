import React from "react";
import Header from "@/components/header/Header";

const Credits: React.FC = () => {
  return (
    <>
      <Header />
      <div className="p-6 md:p-12 max-w-7xl mx-auto text-white">
        <h1 className="text-4xl font-bold">Data Sources:</h1>
        <h1 className="text-4xl font-bold mb-6 text-center text-primary ">
          NepalBhasa.org
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-center">
          <a
            href="https://www.nepalbhasa.org/"
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            NepalBhasa.org
          </a>
          &#32; is an online Newari Dictionary which managed by Daibuli, a
          US-based nonprofit organization who have kindly provided us with their
          backend API allowing us to retrieve more detailed data like images,
          audio, parts of speech and more.
        </p>

        <h1 className="text-4xl font-bold mb-6 text-center text-primary">
          Google Translate
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-center">
          Google Translate API is used to power some of the more popular
          languages in Nepal including but not limited to Sanskrit, Nepali, and
          Maithli.
        </p>

        <h1 className="text-4xl font-bold mb-6 text-center text-primary">
          Individual Contributers
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-center">
          Puja Tajpuriya has been a major contributer to all the Tajpuriya
          translations. <br />
          We are looking for linguists! If you&apos;d like to contribute to this
          project, please reach us via email: support at nepalingo dot com
        </p>
      </div>
    </>
  );
};

export default Credits;
