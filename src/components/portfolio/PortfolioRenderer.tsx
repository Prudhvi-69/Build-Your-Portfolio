import type { ComponentType } from "react";
import type { PortfolioContent } from "@/lib/portfolio/content";
import { googleFontsHref } from "@/lib/templates/fonts";
import { getTemplate } from "@/lib/templates/registry";
import type { LayoutId, TemplateDefinition } from "@/lib/templates/types";
import AbyssLightLayout from "./layouts/AbyssLightLayout";
import AlpineMeadowLayout from "./layouts/AlpineMeadowLayout";
import AmazoniaLayout from "./layouts/AmazoniaLayout";
import BreathOfFlameLayout from "./layouts/BreathOfFlameLayout";
import CursedEnergyLayout from "./layouts/CursedEnergyLayout";
import DecoLayout from "./layouts/DecoLayout";
import DeepFieldLayout from "./layouts/DeepFieldLayout";
import EditorialLayout from "./layouts/EditorialLayout";
import EmeraldOathLayout from "./layouts/EmeraldOathLayout";
import GrandLineLayout from "./layouts/GrandLineLayout";
import HudLayout from "./layouts/HudLayout";
import IronThroneLayout from "./layouts/IronThroneLayout";
import LastSonLayout from "./layouts/LastSonLayout";
import LongshipLayout from "./layouts/LongshipLayout";
import OwlPostLayout from "./layouts/OwlPostLayout";
import PackagingLayout from "./layouts/PackagingLayout";
import ScarletSpeedLayout from "./layouts/ScarletSpeedLayout";
import SceneLayout from "./layouts/SceneLayout";
import ScrollLayout from "./layouts/ScrollLayout";
import SoulReaperLayout from "./layouts/SoulReaperLayout";
import StarShieldLayout from "./layouts/StarShieldLayout";
import ThunderRuneLayout from "./layouts/ThunderRuneLayout";
import VinlandCoastLayout from "./layouts/VinlandCoastLayout";
import WebSlingerLayout from "./layouts/WebSlingerLayout";

interface LayoutProps {
  content: PortfolioContent;
  template: TemplateDefinition;
}

const LAYOUTS: Record<LayoutId, ComponentType<LayoutProps>> = {
  scroll: ScrollLayout,
  hud: HudLayout,
  editorial: EditorialLayout,
  deco: DecoLayout,
  packaging: PackagingLayout,
  scene: SceneLayout,
  "deep-field": DeepFieldLayout,
  "grand-line": GrandLineLayout,
  "last-son": LastSonLayout,
  "soul-reaper": SoulReaperLayout,
  "iron-throne": IronThroneLayout,
  "cursed-energy": CursedEnergyLayout,
  "owl-post": OwlPostLayout,
  "breath-of-flame": BreathOfFlameLayout,
  "vinland-coast": VinlandCoastLayout,
  "star-shield": StarShieldLayout,
  "thunder-rune": ThunderRuneLayout,
  amazonia: AmazoniaLayout,
  "emerald-oath": EmeraldOathLayout,
  longship: LongshipLayout,
  "web-slinger": WebSlingerLayout,
  "scarlet-speed": ScarletSpeedLayout,
  "alpine-meadow": AlpineMeadowLayout,
  "abyss-light": AbyssLightLayout,
};

/**
 * Renders a portfolio in the template the owner picked. Only the selected
 * template's fonts are requested, and an unknown or missing template id falls
 * back to the default rather than throwing.
 */
export default function PortfolioRenderer({
  content,
  templateId,
}: {
  content: PortfolioContent;
  templateId?: string | null;
}) {
  const template = getTemplate(templateId);
  const Layout = LAYOUTS[template.layout];

  return (
    <>
      <link rel="stylesheet" href={googleFontsHref(template.fonts.query)} />
      <Layout content={content} template={template} />
    </>
  );
}
