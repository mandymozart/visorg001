import { useAuth0 } from "@auth0/auth0-react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import FadeInView from "../../Animations/FadeInView";
import { Button, PrimaryButton } from "../../Components/FormElements/Button";
import Layout from "../../Components/Layout";
import { PageLoader } from "../../Components/Loader";
import Tag from "../../Components/Tag";
import MiniWallet from "../../Components/Wallet/MiniWallet";
import { config } from "../../config";
import { useWalletStore } from "../../Stores/WalletStore";

const Container = styled.div`
  padding: 1rem;
  max-width: var(--form-width);
  margin: 0 auto;
  img {
    border-radius: 5rem;
  }
  header {
    margin: 1rem 0;
    display: flex;
    gap: 1rem;
  }
`;

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const {
    abbreviation,
    name,
    artistName,
    street,
    zipCode,
    city,
    country,
    phoneNumber,
    email,
    createdDate,
    updatedDate,
  } = useWalletStore();
  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) return null;

  return (
    <Layout>
      <Container>
        <FadeInView>
          <h2>Your profile</h2>
          <header>
            <div className="image">
              <img src={user.picture} alt={user.name} />
            </div>
            <div className="meta">
              <h3>
                {user.name} <br />
                <small>{artistName}</small>
              </h3>
              <p>
              <Tag>{abbreviation}</Tag>| <small>{user.sub}</small></p>
              <address>
                {user.email}
                <br />
                <small>Member since
                {dayjs(createdDate).format(config.DATE_FORMAT)}</small>
              </address>
            </div>
          </header>
          <MiniWallet />
          <PrimaryButton>Top up</PrimaryButton>{" "}
          <Link to="/wallet">
            <Button>My wallet</Button>
          </Link>
        </FadeInView>
      </Container>
    </Layout>
  );
};

export default Profile;
