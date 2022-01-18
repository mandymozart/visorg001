import styled from "@emotion/styled";
import React from "react";
import CTA from "../../Components/CTA";
import Layout from "../../Components/Layout";

const Container = styled.div`
  padding: 1rem;
  .stereoview {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    img {
      width: 100%;
    }
  }
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100vh;
  border: 0;
  display: block;
`;

function FindUs() {
  return (
    <Layout>
      <Container>
        <h1>Find us</h1>
        <p>
          <b>Portal</b>
          <br />
          Park &amp; Ride <br />
          Spittelauer Laende 12 / 1 Floor / Parkdeck 3
          <br />
          1090 Wien
          <br />
          Austria
          <br />
          <a href="phone:+436608366059" rel="noreferrer">
            +436608366059
          </a>
        </p>
        <p>
          <CTA
            href="mailto:office@viennastruggle.com"
            rel="noreferrer"
            target="_blank"
          >
            Reserve a studio visit.
          </CTA>
        </p>
        <div className="stereoview">
          <img
            src="https://res.cloudinary.com/ddqo2y6zh/image/upload/ar_1:1,b_rgb:ffff00,bo_0px_solid_rgb:ffff00,c_fill,g_auto,o_100,r_max,w_1000/v1640687631/visorg001-viennastruggle-com/portal-cyclorma-outview.jpg"
            alt=""
          />
          <img
            src="https://res.cloudinary.com/ddqo2y6zh/image/upload/ar_1:1,b_rgb:ffff00,bo_1px_solid_rgb:ffff00,c_fill,g_auto,r_max,w_1000/v1640687696/visorg001-viennastruggle-com/portal-ambisonic-hexagon.jpg"
            alt=""
          />
        </div>
      </Container>
      <Iframe
        title="map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2657.527172526606!2d16.358674215333448!3d48.23497857923129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d071fb2895ddf%3A0xcfc072afb1d60cb1!2sVienna%20Struggle%20Portal!5e0!3m2!1sen!2sat!4v1636981125722!5m2!1sen!2sat"
        width="100%"
        height="600"
        allowfullscreen=""
        loading="lazy"
      ></Iframe>
    </Layout>
  );
}

export default FindUs;
