import { LandingFeatures } from "./Feature";
import LandingHero from "./Hero";

export default function LandingBody() {
    return (
        <div>
            <LandingHero />
            <LandingFeatures />
        </div>
    );
}