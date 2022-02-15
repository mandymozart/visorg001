import styled from "@emotion/styled";
import React from "react";
import { GiAbacus, GiCalendar, GiMoneyStack, GiSharpAxe } from "react-icons/gi";
import FadeInView from "../../Animations/FadeInView";
import { BaseSection } from "../LandingPage/BaseSection";
import { Hero } from "../LandingPage/Hero";

const Container = styled.div`
  p {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Perk = styled.div`
display: flex;
gap: 2rem;
justify-content: center;
align-items: center;
  > div:first-of-type {
    font-size: 7rem;
  }
`;
const InventoryWelcomePage = () => {
  return (
    <Container>
      <BaseSection>
        <Hero>
          <FadeInView>
            <div>
              <h1>
                Sharing is empowerment! <GiSharpAxe />
              </h1>
              <p className="text-xl">
                We like to share our infrastructure. In order to maintain the
                quality we also share the responsibility. Making sure that we
                pay for the rentals guarantees long term sustainability of the
                portal, the project and the people you work with.
              </p>
            </div>
          </FadeInView>
        </Hero>
        <FadeInView>
          <Perk>
            <div>
              <GiCalendar />
            </div>
            <div>
              <h3>Check availabilities</h3>
              <p className="text-xl">
                Make a new reservation to rent equipment. The app will let you
                know when an item is not available or where it is.
              </p>
            </div>
          </Perk>
        </FadeInView>
        <FadeInView>
          <Perk>
            <div>
              <GiMoneyStack />
            </div>
            <div>
              <h3>Earn Tokens</h3>
              <p className="text-xl">
                Each time someone uses your gear you receive Tokens. With these
                you can either grow your influence in the governance of Vienna
                Struggle or you can use for maintenance or rent.
              </p>
            </div>
          </Perk>
        </FadeInView>
        <FadeInView>
          <Perk>
            <div>
              <GiAbacus />
            </div>
            <div>
              <h3>Monthly invoices</h3>
              <p className="text-xl">
                Rent as much as you like and we invoice you at the end of each
                month. This is especially useful if you do many small
                productions.
              </p>
            </div>
          </Perk>
        </FadeInView>
      </BaseSection>
    </Container>
  );
};

export default InventoryWelcomePage;
