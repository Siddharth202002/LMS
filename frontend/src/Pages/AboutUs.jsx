import knowledgetree from "../assets/Images/knowledgetree.png";
import CarosalSlide from "../Components/CarosalSlide";
import { celebrites } from "../Constants/CelebrityData";
import HomeLayout from "../Layouts/HomeLayout";

function AboutUs() {
  return (
    <HomeLayout>
      <div className=" about-us pl-20 pt-20 flex flex-col text-white  ">
        <div className=" upper-section flex items-center gap-30 mx-10">
          <section className="w-1/2 space-y-10">
            <h1 className=" text-5xl text-yellow-500 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl text-gray-200">
              Our goal is to provide the affordable and quality education to the
              world. We are providing the platform for the aspiring teachers and
              students to share their slills,creativity and knowledge to each
              other to empower and contribute in the growth and wellness of
              mankind.
            </p>
          </section>

          <div className=" image w-1/2">
            <img
              src={knowledgetree}
              id="test1"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              className=" drop-shadow-2xl"
              alt="about main image"
            />
          </div>
        </div>

        <div className="carousel w-1/2 m-auto my-16">
          {celebrites &&
            celebrites.map((celebrity) => {
              return (
                <CarosalSlide
                  {...celebrity}
                  totalSlides={celebrites.length}
                  key={celebrity.slideNumber}
                />
              );
            })}
        </div>
      </div>
    </HomeLayout>
  );
}

export default AboutUs;
