import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";
import logo from '../../AgUSD2.png';

const Footer = () => {
  return (
    <Box>
      <h1 style={{ color: "white",
                   textAlign: "center",
                   marginTop: "-50px" }}>
        Aggregated Finance: making stables, more stable.
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>Contact Us</Heading>
            <FooterLink href="https://chats.fantoms.art">Fantoms.art chats</FooterLink>
            <FooterLink href="https://t.me/AggregatedFin">Telegram Chat</FooterLink>
            <FooterLink href="https://t.me/AggregatedAnn">Telegram Announcements</FooterLink>
          </Column>
          <Column>
            <Heading>Use AgUSD</Heading>
            <FooterLink href="https://ftm.curve.fi/factory/107">Swap at Curve</FooterLink>
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="https://twitter.com/Aggregated_">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="https://github.com/FantomsOpera">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  GitHub
                </span>
              </i>
            </FooterLink>
          </Column>
          <Column style={{
            paddingLeft: '7.5vw'
          }}>
            <img src={logo} style={{
               width: '20vw'
            }}/>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
