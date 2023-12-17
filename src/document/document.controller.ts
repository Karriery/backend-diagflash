import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DocumentService } from "./document.service";
import { CreateDocumentDto } from "./dto/create-document.dto";
import { UpdateDocumentDto } from "./dto/update-document.dto";
import { Public } from "src/auth/decorators/public";

@Controller("document")
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Public()
  @Post()
  create(@Body() createDocumentDto: CreateDocumentDto) {
    var ageMini = null;
    var trimestre = null; // L30;
    var age = null;

    const birthYearMap = {
      "1957": { ageMini: 62, trimestre: 166, age: 67 },
      "1958": { ageMini: 62, trimestre: 167, age: 67 },
      "1959": { ageMini: 62, trimestre: 167, age: 67 },
      "1960": { ageMini: 62, trimestre: 167, age: 67 },
      "1961, avant 31/08": { ageMini: 62, trimestre: 168, age: 67 },
      "1961, après 31/08": { ageMini: 62.25, trimestre: 169, age: 67 },
      "1962": { ageMini: 62.5, trimestre: 169, age: 67 },
      "1963": { ageMini: 62.75, trimestre: 170, age: 67 },
      "1964": { ageMini: 63, trimestre: 171, age: 67 },
      "1965": { ageMini: 63.25, trimestre: 172, age: 67 },
      "1966": { ageMini: 63.5, trimestre: 172, age: 67 },
      "1967": { ageMini: 63.75, trimestre: 172, age: 67 },
      "1968, et après": { ageMini: 64, trimestre: 172, age: 67 },
    };

    var birthYear = createDocumentDto.anneDeNaissance;
    if (birthYear === "Avant 1957") {
      birthYear = "1957";
    }
    if (birthYearMap.hasOwnProperty(birthYear)) {
      const values = birthYearMap[birthYear];
      ageMini = values.ageMini;
      trimestre = values.trimestre;
      console.log("L30", trimestre);

      age = values.age;
    }
    // His  age now
    console.log(createDocumentDto.anneDeNaissance);
    var year = createDocumentDto.anneDeNaissance.slice(0, 4);
    if (createDocumentDto.anneDeNaissance === "Avant 1957") {
      year = "1957";
    }
    const birthYear2 = parseInt(year);
    const currentYear = new Date().getFullYear();
    const ageActuel = currentYear - birthYear2;
    // his age
    // trimester calcule
    var addedValue = 0;
    if (createDocumentDto.civilite === "F") {
      addedValue = createDocumentDto.nombreDenfants * 8;
    }
    var trimestreActuelTheorique = (ageActuel - age) * 4 + addedValue; // L34
    console.log("L34", trimestreActuelTheorique);

    // trimester
    var trimesterAcquerir =
      (createDocumentDto.ageSouhaiteDeDepart - ageActuel) * 4;

    // Risque trimestre
    var result = "A15";
    if (
      createDocumentDto.civilite === "F" &&
      createDocumentDto.nombreDenfants > 0
    ) {
      result = "A10";
    } else if (
      createDocumentDto.avezVousEte.includes("Service militaire effectué") ||
      createDocumentDto.avezVousRencontre.includes("Arrêt maladie > 1 mois") ||
      createDocumentDto.avezVousRencontre.includes(
        "Arrêt accident du travail"
      ) ||
      createDocumentDto.avezVousRencontre.includes("Invalidité") ||
      createDocumentDto.avezVousRencontre.includes("Chômage") ||
      createDocumentDto.avezVousRencontre.includes(
        "Congéz parental, dassistance…"
      )
    ) {
      result = "A11";
    } else if (createDocumentDto.avezVousEte.includes("Travail à létranger")) {
      result = "A12";
    } else if (
      createDocumentDto.avezVousEte.includes("Plusieurs régimes en même temps")
    ) {
      result = "A13";
    } else if (createDocumentDto.avezVousEte.length) {
      var copy = createDocumentDto.avezVousEte;
      if (copy.includes("Plusieurs régimes en même temps")) {
        copy.splice(copy.indexOf("Plusieurs régimes en même temps"), 1);
      }
      if (copy.includes("Apprentissage, job étudiants ?")) {
        copy.splice(copy.indexOf("Apprentissage, job étudiants ?"), 1);
      }
      if (copy.includes("Service militaire effectué")) {
        copy.splice(copy.indexOf("Service militaire effectué"), 1);
      }
      if (copy.length >= 2) {
        result = "A14";
      }
    }
    if ((result = "A10")) {
    }
    // end first section
    //

    var result2 = "A17";
    if (createDocumentDto.avezVousRencontre.length) {
      result2 = "A11";
    }
    if (createDocumentDto.avezVousEte.includes("Travail à létranger")) {
      result2 = "A12";
    }
    if (createDocumentDto.avezVousEte.includes("Avec changement demployeur")) {
      result2 = "A13";
    }
    if (
      createDocumentDto.avezVousEte.includes("Plusieurs régimes en même temps")
    ) {
      result2 = "A14";
    }
    if (createDocumentDto.avezVousRencontre.length) {
      var copy = createDocumentDto.avezVousEte;
      if (copy.includes("Plusieurs régimes en même temps")) {
        copy.splice(copy.indexOf("Plusieurs régimes en même temps"), 1);
      }
      if (copy.includes("Apprentissage, job étudiants ?")) {
        copy.splice(copy.indexOf("Apprentissage, job étudiants ?"), 1);
      }
      if (copy.includes("Service militaire effectué")) {
        copy.splice(copy.indexOf("Service militaire effectué"), 1);
      }
      if (copy.length >= 2) {
        result2 = "A15";
      }
    }
    if (
      createDocumentDto.evolution === "Plutôt décroissante" ||
      createDocumentDto.evolution === "Irrégulière"
    ) {
      result2 = "A16";
    }

    /// Third section
    var result3 = "A15";
    if (
      createDocumentDto.titreIndividuel === "non" &&
      createDocumentDto.titreProfessionnelFacultatif === "non" &&
      createDocumentDto.titreProfessionnelObligatoire === "non"
    ) {
      result3 = "A11";
    }
    if (
      createDocumentDto.titreIndividuel === "non" &&
      createDocumentDto.titreProfessionnelObligatoire === "oui" &&
      createDocumentDto.titreProfessionnelFacultatif === "non"
    ) {
      result3 = "A12";
    }
    if (
      (createDocumentDto.titreIndividuel === "oui" ||
        createDocumentDto.titreProfessionnelFacultatif === "oui") &&
      createDocumentDto.titreProfessionnelObligatoire === "non"
    ) {
      result3 = "A13";
    }
    if (
      createDocumentDto.titreIndividuel === "oui" &&
      createDocumentDto.titreProfessionnelObligatoire === "oui" &&
      createDocumentDto.titreProfessionnelFacultatif === "oui"
    ) {
      result3 = "A14";
    }

    /// start 4 section
    var result4 = "";
    createDocumentDto.risqueAge = {
      status: "",
      text: "",
    };
    if (createDocumentDto.ageSouhaiteDeDepart !== "Dès que possible") {
      var nombreDeTrimesterMonque = (trimestre - trimestreActuelTheorique) * 4;
      var x =
        nombreDeTrimesterMonque / 12 + createDocumentDto.ageSouhaiteDeDepart;
      if (x >= 62) {
        createDocumentDto.risqueAge.status = "soleil";
        if (
          JSON.stringify(createDocumentDto.avezVousRencontre) ===
            JSON.stringify([]) ||
          JSON.stringify(createDocumentDto.avezVousRencontre) ===
            JSON.stringify(["Congéz parental, dassistance…"])
        ) {
          createDocumentDto.risqueAge.text =
            "Il faudra revérifier vos trimestres de toute façon, mais il semble que vous puissiez faire valoir vos droits à la retraite à l'âge minimal légal. Les règles peuvent changer d'ici là, donc il est indispensable de vérifier le nombre de trimestres actuel et ceux à acquérir et ensuite vérifier si on est toujours en adéquation avec les dernières évolutions des lois.";
        }
        if (
          createDocumentDto.avezVousRencontre.includes(
            "Arrêt maladie > 1 mois"
          ) ||
          createDocumentDto.avezVousRencontre.includes(
            "Arrêt accident du travail"
          ) ||
          createDocumentDto.avezVousRencontre.includes("Invalidité") ||
          createDocumentDto.avezVousRencontre.includes("Chômage")
        ) {
          createDocumentDto.risqueAge.text =
            "Nous avons fait l'hypothèse que vos périodes non cotisées vous donnent les droits à trimestres. Dans ce cas  il semble que vous puissiez faire valoir vos droits à la retraite à l'âge minimal légal. Il est indispensable de vérifier cette hypothèse par un audit approfondi. Nous ne possédons pas à ce stade d'informations suffisantes pour être catégoriques à 100%. Les règles peuvent changer d'ici là, donc il est indispensable de vérifier le nombre de trimestres  actuels et ceux à acquérir et ensuite vérifier si on est toujours en adéquation avec les dernières évolutions des lois.";
        }
      } else if (x >= 67) {
        createDocumentDto.risqueAge.status = "orage";
        createDocumentDto.risqueAge.text = `Il semble que nous n'ayez pas suffisamment de trimestres pour pouvoir partir à la retraite au taux plein avant 67 ans. Et il semblerait que même à cet âge vous n'auriez pas la pension maximale possible. Une "chasse" aux trimestres est indispensable pour vous permettre d'optimiser votre départ. Seules des données précises et fiables permettront de vous donner une meilleure image de votre avenir retraite.`;
      } else {
        createDocumentDto.risqueAge.status = "nuage";
        if (
          JSON.stringify(createDocumentDto.avezVousRencontre) ===
            JSON.stringify([]) ||
          JSON.stringify(createDocumentDto.avezVousRencontre) ===
            JSON.stringify(["Congéz parental, dassistance…"])
        ) {
          createDocumentDto.risqueAge.text =
            "Avec le peu de données en notre possession, il semblerait que vous puissiez faire valoir vos droits à pension au taux plein avant 67 ans. Seul un audit approfondi des trimestres que vous avez déjà acquis pourra confirmer si vous êtes plutôt vers l'âge minimal légal (dans votre cas {insérer Q41} ans ou plus près de 67 ans. L'enjeu est important et vous pouvez économiser un certain nombre d'années de cotisation par une connaissance exacte de vos acquis.  ";
        }
        if (
          createDocumentDto.avezVousRencontre.includes(
            "Arrêt maladie > 1 mois"
          ) ||
          createDocumentDto.avezVousRencontre.includes(
            "Arrêt accident du travail"
          ) ||
          createDocumentDto.avezVousRencontre.includes("Invalidité") ||
          createDocumentDto.avezVousRencontre.includes("Chômage")
        ) {
          createDocumentDto.risqueAge.text =
            "Nous avons fait l'hypothèse que vos périodes non cotisées vous donnent les droits à trimestres. Avec le peu de données en notre possession, il semblerait que vous puissiez faire valoir vos droits à pension au taux plein avant 67 ans mais plus tard que l'âge minimum légal { insérer Q41} ans dans votre cas. Seuls un audit approfondi des trimestres et leur chasse permettra de reconfirmer si vous êtes vers le haut ou le bas de la fourchette. L'enjeu est important et vous pouvez économiser un certain nombre d'années de cotisation par une connaissance exacte de vos acquis.  ";
        }
      }
    } else {
      createDocumentDto.risqueAge.status = "nuage";
      createDocumentDto.risqueAge.text =
        "pour être sûr de partir dès que possible, c'est-à-dire des que vous aurez accumulé suffisamment de trimestres pour bénéficier d'une pension à taux plein, il vous faut vous assurer qu'il n'y a pas eu d'oubli dans le recensement de vos trimestres ce qui est fréquemment le cas. Notre audit va vous permettre de retrouver tous vos trimestres et de partir le plus tôt possible à la retraite";
    }
    /// start 5 section
    var result5 = "A17";
    if (trimesterAcquerir + trimestreActuelTheorique < 0.8 * trimestre) {
      result5 = "A10";
    }
    if (
      createDocumentDto.evolution === "Plutôt décroissante" ||
      createDocumentDto.evolution === "Irrégulière"
    ) {
      result5 = "A11";
    }
    if (
      createDocumentDto.titreIndividuel === "oui" ||
      createDocumentDto.titreProfessionnelObligatoire === "oui" ||
      createDocumentDto.titreProfessionnelFacultatif === "oui"
    ) {
      result5 = "A14";
    }
    if (
      createDocumentDto.titreIndividuel === "oui" &&
      createDocumentDto.titreProfessionnelObligatoire === "oui" &&
      createDocumentDto.titreProfessionnelFacultatif === "oui"
    ) {
      result5 = "A12";
    }

    if (
      createDocumentDto.titreIndividuel === "non" &&
      createDocumentDto.titreProfessionnelObligatoire === "non" &&
      createDocumentDto.titreProfessionnelFacultatif === "non" &&
      (createDocumentDto.situationFamiliale.includes("Célibataire") ||
        createDocumentDto.situationFamiliale.includes("Veuf"))
    ) {
      result5 = "A15";
    }
    if (
      createDocumentDto.situationFamiliale.includes("Marié ou remarié") ||
      createDocumentDto.situationFamiliale.includes("Divorcé") ||
      createDocumentDto.situationFamiliale.includes("Pacs ou concubinage")
    ) {
      result5 = "A16";
    }
    /// start 6 section
    var result6 = "A16";
    if (createDocumentDto.situationFamiliale.includes("Pacs ou concubinage")) {
      result6 = "A11";
    }
    if (
      createDocumentDto.situationFamiliale.includes("Marié ou remarié") &&
      !createDocumentDto.situationFamiliale.includes("Divorcé")
    ) {
      result6 = "A12";
    }
    if (
      !createDocumentDto.situationFamiliale.includes("Marié ou remarié") &&
      !createDocumentDto.situationFamiliale.includes("Divorcé") &&
      createDocumentDto.situationFamiliale.includes("Veuf")
    ) {
      result6 = "A13";
    }
    if (
      createDocumentDto.situationFamiliale.includes("Marié ou remarié") &&
      createDocumentDto.situationFamiliale.includes("Divorcé")
    ) {
      result6 = "A14";
    }
    if (createDocumentDto.situationFamiliale.includes("Célibataire")) {
      result6 = "A15";
    }
    console.log(result, result2, result3, result5, result6);

    if (result === "A10") {
      createDocumentDto.risqueTrimestre = {
        status: "orage",
        text: "Le fait d'avoir donné naissance et/ou d'avoir adopté des enfants donne des droits à des majorations de trimestres et de pensions. Il y a de fortes chances que ces droits ne soient pas encore pris en compte dans vos relevés et estimations de pensions. Une analyse fine de ces droits vous permettrait de définir plus exactement à quel moment vous pourriez faire valoir vos droits à pension, certainement plus tôt que vous ne le pensiez.",
      };
    }
    if (result === "A11") {
      createDocumentDto.risqueTrimestre = {
        status: "orage",
        text: "Vous avez eu des périodes dans votre activité où vous ne cotisiez plus (chômage, arrêt maladie...). Par expérience nous savons que 9 fois sur 10 il y a des erreurs. Très souvent, l'attribution de trimestres gratuits n'est pas prise en compte dans les relevés intermédiaires mis à votre disposition par les caisses des régimes de base. Ces éléments ne sont pas perdus et sont corrigeables ou validables au moment de la demande de liquidation. Mais il est important de savoir exactement vos droits, notamment savoir quand vous pourriez faire valoir vos droits à pension avant 67 ans. C'est pourquoi un audit de vos droits déjà acquis vous permettrait une vision claire et précise des corrections à apporter et de la stratégie à bâtir pour les années d'activité qui restent et partir avec l'optimum de vos droits. ",
      };
    }
    if (result === "A12") {
      createDocumentDto.risqueTrimestre = {
        status: "orage",
        text: "Une partie de votre carrière correspond à du détachement à l'étranger ou à de l'expatriation. En fonction des pays et de votre statut (détaché, expatrié, ou autre) votre situation quant aux trimestres validés notamment peut changer du tout au tout. Des accords entre organismes sociaux et caisses de retraite peuvent exister entre ces pays et la France (reconnaissance réciproque, assistance ou non à la liquidation…) Par expérience, dans 99% des cas, des erreurs vont intervenir qui vont soit vous faire perdre de l'argent, soit vous faire partir plus tard que vous n'en auriez eu la possibilité  si une étude approfondie avez été conduite. ",
      };
    }
    if (result === "A13") {
      createDocumentDto.risqueTrimestre = {
        status: "nuage",
        text: "Dans votre vie professionnelle, vous avez eu l'occasion d'être affilié et de cotiser à plusieurs régimes de retraite en même temps (emploi salarié et activités ponctuelles  dans un hôpital ou une université, mandat social et emploi salarié…). Il n'y a que 4 trimestres par an reconnus comme validés par l'assurance retraite, mais vous voudriez savoir si cela ne vous fait pas perdre les acquis potentiels liés aux cotisations dans les différents régimes. Une étude fine de vos acquis vous permettrait de conforter votre situation, d'apporter les corrections éventuelles et de savoir à quel moment exact et comment faire valoir l'ensemble de vos droits. Il peut y avoir interférence entre régimes, un audit permettrait de tout positionner dans les meilleures conditions. ",
      };
    }
    if (result === "A14") {
      createDocumentDto.risqueTrimestre = {
        status: "nuage",
        text: "Dans votre carrière professionnelle, vous avez eu à être affilié consécutivement à deux ou plusieurs régimes de retraite différents (fonctionnaire puis salarié du secteur privé, salarié puis travailleur indépendant ou profession libérale…). Vous vous inquiétez de savoir comment se gère l'interférence entre ces régimes. Notre expérience nous montre que dans la plupart des cas, des erreurs peuvent s'immiscer dans les relevés ou dans leur traitement. Un audit approfondi permet de débusquer des erreurs ou oublis potentiels et de les corriger. Pourquoi les corriger bien avant la demande de liquidation : pour gagner du temps. Si vous demandez vos corrections au moment de votre demande de liquidation, les délais pour que tout soit validé peuvent dépasser un an actuellement. Mieux vaut présenter un dossier nettoyé de toutes scories pour avoir une liquidation dans les meilleurs délais (3 à 6 mois entre demande et perception de la première pension en moyenne).",
      };
    }
    if (result === "A15") {
      createDocumentDto.risqueTrimestre = {
        status: "soleil",
        text: "Vous pensez faire partie des assurés sans problème lors de la liquidation. Mais ce test n'a pas valeur de preuve car seul un audit en pleine connaissance des documents permettrait de confirmer qu'aucun problème ne risque de se présenter lors de la liquidation et que vous ferez votre demande de liquidation au bon âge pour avoir l'optimum de pension. La Cour des Comptes a déterminé que 1 dossier sur 7 en moyenne (1 sur 5 sur certaines caisses) présente une erreur et que cette erreur s'élève à 11,4% de perte de pension en moyenne. Cette statistique ne dit pas si la date de départ est optimisée, donc si des assurés auraient pu faire valoir leurs droits plus tôt aux mêmes conditions. Voulez vous prendre le risque de cotiser plus longtemps sans gain de pension ou de voir votre pension amputée de majorations auxquelles vous auriez eu légitimement droit?",
      };
    }

    if (result2 === "A11") {
      createDocumentDto.risqueComp = {
        status: "orage",
        text: "Pendant des périodes où l'assuré ne cotise plus (chômage, arrêt maladie…)  les caisses de retraite complémentaires {ARRCO AGIRC pour les salariés par exemple) peuvent attribuer des points  gratuitement. Leur nombre et la durée d'attribution en sont limités et la référence d'attribution est clairement définie en évoluant régulièrement. Très souvent, l'attribution de ces points n'est pas prise  en compte dans les relevés intermédiaires. Par expérience, dans tous les dossiers traités, il a fallu intervenir pour obtenir régularisation. Il en est de même dans certaines conventions collectives (intempéries dans le BTP par exemple).  Leur rétablissement demande des formalités précises et peut nécessiter un certain temps. La régularisation n'est pas automatique. Ces points manquants peuvent avoir un impact important sur votre stratégie et un audit préalable vous permettrait de les récupérer dans des délais raisonnables. ",
      };
    }
    if (result2 === "A12") {
      createDocumentDto.risqueComp = {
        status: "orage",
        text: "Quand un assuré a une partie de sa carrière hors de France, en fonction de son statut il a ou non accès à des régimes complémentaires au régime de base. Pour la partie française, rien n'est changé, sauf à vérifier les points gratuits ou les bonus/malus éventuels. Attention, les régimes complémentaires français sont plafonnés à 8 PASS.  En cas de statut expatrié, localement il peut ne pas y avoir de complémentaire obligatoire et il peut exister des régimes professionnels facultatifs ou à montant librement décidé en interne et fonctionnant par capitalisation (donc dépendant des choix d'investissement).",
      };
    }
    if (result2 === "A13") {
      createDocumentDto.risqueComp = {
        status: "nuage",
        text: "Comme vous avez travaillé dans votre carrière chez plusieurs employeurs, chaque société peut avoir cotisé à des caisses ARRCO/AGIRC différentes. Au moment du changement de contrat de travail, théoriquement il y a transfert des points acquis. Il peut se trouver (problème informatique, fusion de caisses…) que ces points ne soient pas crédités dans votre compte. La recherche peut être longue pour obtenir satisfaction; Il peut se faire également que les points ne soient pas crédités parce que l'employeur n'a pas payé les cotisations (cas des dépôts de bilan anciens). Il est donc recommandé de vérifier régulièrement les relevés et de lister les anomalies détectées puis de voir comment obtenir correction.",
      };
    }
    if (result2 === "A14") {
      createDocumentDto.risqueComp = {
        status: "nuage",
        text: "En cas d'emplois simultanés soit chez différents employeurs, soit sous différents régimes, des règles spécifiques interviennent et le mode de calcul n'est pas forcément le même dans les régimes complémentaires que pour un emploi simple. Il est fortement recommandé de vérifier le bien fondé de l'attribution des droits dans chaque régime afin de ne pas être lésé  lors de la liquidation. Les corrections peuvent être longues et décaler le moment où les pensions peuvent être servies.",
      };
    }
    if (result2 === "A15") {
      createDocumentDto.risqueComp = {
        status: "nuage",
        text: "Quand un assuré dans sa carrière a eu plusieurs régimes (salarié, non salarié), il est important de vérifier que dans chaque régime tout est vraisemblable et cohérent. Des règles peuvent  différer légèrement d'un régime à l'autre. Il y a aussi le problème d'attribution de points gratuits, de majoration (à quel régime vont les majorations enfants par exemple). Seul un audit minutieux permet de s'assurer qu'il n'y a aucune erreur et ainsi de pouvoir bâtir sereinement sa stratégie.",
      };
    }
    if (result2 === "A16") {
      createDocumentDto.risqueComp = {
        status: "nuage",
        text: "Vos revenus évoluent de façon décroissante ou irrégulière. Les simulations qui peuvent être faites automatiquement prennent rarement en compte cette possibilité de chaos. La conséquence peut être très nuisible pour vous car avec une surestimation des points futurs à acquérir vous pouvez vous retrouver lors de la liquidation avec des revenus très éloignés de vos besoins. N'oubliez pas de plus que les régimes ont historiquement une dégradation moyenne de 1% par an. Les deux effets cumulés seront difficiles à contrer au dernier moment. Seule une stratégie établie des années en avance permet d'avancer sereinement. Un audit initial et des mises à jour régulières vous permettront d'éviter cet écueil.",
      };
    }
    if (result2 === "A17") {
      createDocumentDto.risqueComp = {
        status: "soleil",
        text: "Vous pensez faire partie des assurés sans problème lors de la liquidation. Mais ce test n'a pas valeur de preuve car seul un audit en pleine connaissance des documents permettrait de confirmer qu'aucun problème ne risque de se présenter lors de la liquidation; D'autre part, n'oubliez pas deux points essentiels : . Les régimes historiquement se dégradent de 1% par an. Une carrière dure plus de 40 ans; 1% de perte par an sur 42 ans représente 35% de perte. . Les régimes évoluent en permanence : une grande réforme tous les 10 ans, des ajustements tous les 2 ou 3 ans. Pendant une carrière on subit 4 réformes. Il est donc indispensable de partir sur de bonnes bases avec un audit et de faire régulièrement les ajustements nécessaires qui seront moins 'douloureux'.",
      };
    }
    if (result3 === "A11") {
      createDocumentDto.risqueSup = {
        status: "orage",
        text: "Vos revenus futurs lors du passage à la retraite ne reposent que sur les régimes obligatoires. Un point complet de votre situation est indispensable pour savoir déjà si tous vos acquis sont bien pris en compte. Cela permettra de  définir les erreurs ou oublis existants, de les corriger et de bâtir une stratégie sur les suppléments à mettre en place.",
      };
    }
    if (result3 === "A12") {
      createDocumentDto.risqueSup = {
        status: "orage",
        text: "Généralement les régimes mis en place par l'entreprise de façon obligatoire, bien qu'ayant le mérite d'exister, sont limités dans leur effet pour au moins quatre raisons .  Les limites fiscales et sociales de déductibilité des cotisations . Le coût et l'engagement financier sur le long terme, . Si  l'assuré quitte l'entreprise, il garde l'acquis mais ne génère pas forcément de nouveaux droits dans une nouvelle société. La capitalisation y trouve donc des limites. . L'entreprise ne souhaite pas prendre de risques sur les choix de placements sélectionnés ou sélectionnables. Donc on ne peut avoir que de faibles rendements sur la capitalisation. Il y a donc lieu de vérifier que les acquis sont pérennes, rentables et que les gains à venir vont combler votre perte de pouvoir d'achat lors du passage à la retraite",
      };
    }
    if (result3 === "A13") {
      createDocumentDto.risqueSup = {
        status: "nuage",
        text: "Les fonds où l'épargne est investie risquent d'avoir un rendement inférieur à l'inflation ou juste compenser celle-ci. Il y a donc risque de perte de pouvoir d'achat sur le long terme.  La sélection des fonds doit être faite en respectant un équilibre risque/rendement optimal. Il y a lieu de vérifier si cet équilibre vous est favorable. Seul une analyse fine permettrait de garantir la pérennité de l'investissement et le meilleur usage de votre épargne ",
      };
    }
    if (result3 === "A14") {
      createDocumentDto.risqueSup = {
        status: "soleil",
        text: "Vous avez trois sources diversifiées pour vous apporter des suppléments de revenus lors du passage à la retraite. Vous êtes donc dans une situation privilégiée. Les trois risques auxquels vous pouvez être exposés sont : . Un changement professionnel qui ne permettrait pas de pérenniser dans le temps l'acquisition de droits en capitalisation au niveau entreprise . Une perte d'activité qui ne permettrait plus les versements réguliers sur vos contrats individuels . Un choix inadéquat de supports d'investissement qui pourrait conduire soit à un rendement trop faible (donc une perte de pouvoir d'achat étant donnée l'inflation), soit à une exposition trop forte au risque et donc un risque de perte de capital. Il est donc recommandé de vérifier le bon équilibre dans le temps des options prises et leur pérennité.",
      };
    }
    if (result3 === "A15") {
      createDocumentDto.risqueSup = {
        status: "nuage",
        text: "Il semblerait que vous n'avez que partiellement et modérément fait usage des différents modes qui permettraient de conforter votre train de vie futur. Un point complet de votre situation parait nécessaire pour comprendre où vous en êtes, consolider tous vos acquis obligatoires et bâtir une stratégie sur les suppléments à mettre en place.",
      };
    }
    if (result5 === "A10") {
      createDocumentDto.risqueTraindevie = {
        status: "orage",
        text: "Comme vous n'avez pas une carrière complète, vos revenus de pension risquent de vous conduire à une perte significative de train de vie Nous vous recommandons de faire une estimation affinée de vos acquis et de vos besoins financiers en retraite de façon à ajuster vos suppléments de revenus à venir.",
      };
    }
    if (result5 === "A11") {
      createDocumentDto.risqueTraindevie = {
        status: "orage",
        text: "Bien qu'ayant une carrière apparemment complète, vos revenus donc vos cotisations retraites ont subi des fluctuations et il faut imaginer que vos revenus futurs vont être aléatoires et inférieurs à ce que vous imaginiez. Il y a donc lieu d'estimer rapidement ce que vous avez acquis, ce que l'avenir peut vous permettre encore d'acquérir avec une forte incertitude. Il y a donc aussi à prévoir une veille régulière. Pour ajuster à vos besoins, il y a lieu de se reposer pour le complément à apporter sur des bases saines, rentables et sans corrélation avec les marchés. A cela viennent s'ajouter les réformes régulières des règles et la dégradation habituelle historique de 1% par an des régimes.",
      };
    }
    if (result5 === "A12") {
      createDocumentDto.risqueTraindevie = {
        status: "soleil",
        text: "Vous avez l'habitude d'un train de vie confortable. Quelles que soient les dispositions que vous ayez pu prendre à titre personnel et à titre entreprise, lors de votre départ en retraite vos revenus provenant des régimes obligatoires ne devraient représenter que 30 à 50% de vos derniers revenus. Il y a donc lieu tout d'abord de vérifier quel sera le montant que vous pourriez percevoir à la liquidation de vos droits, quels sont vos besoins à cette époque et à quel niveau la différence est couverte. De plus les régimes se dégradant en moyenne de 1% par an, une marge de manœuvre de sécurité est à prévoir.",
      };
    }
    if (result5 === "A13") {
      createDocumentDto.risqueTraindevie = {
        status: "soleil",
        text: "Vous avez des revenus stables ou croissants durant votre carrière et vous avez choisi à la fois à titre professionnel et à titre individuel d'améliorer vos revenus futurs au-delà des régimes obligatoires par de l'épargne individuelle et en profitant des dispositifs qu'offrent les entreprises. N'oubliez tout de même pas de vérifier qu'aucun trimestre n'a été oublié ou omis,  ce qui vous ferait partir en retraite plus tard. Réfléchissez également à la pérennité de votre situation et enfin n'oubliez pas que les régimes font l'objet de réformes régulières, une fois tous les 10 ans en moyenne, et qu'historiquement les régimes se dégradent de 1% par an en moyenne. Enfin vérifiez régulièrement le bien fondé des choix de fonds d'investissement où votre épargne est investie, les marchés sont changeants et le bon rapport risque/rendement choisi au moment de la souscription peut se dégrader dans le temps.",
      };
    }
    if (result5 === "A14") {
      createDocumentDto.risqueTraindevie = {
        status: "nuage",
        text: "Vous avez une carrière complète et des revenus stables mais vous n'avez mis en place qu'une partie des possibilités de conforter vos revenus futurs. Vous faites donc face à plusieurs aléas : tout d'abord tous mes droits sont-ils bien pris en compte. Ensuite, ces droits suffisent-ils à m'assurer un train de vie confortable dans le futur. Pour cela un audit à la fois de votre carrière,  de vos besoins, et un suivi régulier (voir l'incidence des réformes qui se présenteront dans le reste de votre carrière) sont indispensables. ",
      };
    }
    if (result5 === "A15") {
      createDocumentDto.risqueTraindevie = {
        status: "nuage",
        text: "Vous avez fait pour l'instant le choix de faire reposer vos revenus futurs, lors le liquidation de votre retraite, sur les seuls régimes obligatoires. Vous n'avez pas de conjoint à charge , donc vous imaginez que vos  besoins seront moindres. Mais vous n'êtes tout de même pas à l'abri, sur les régimes obligatoires, d'erreurs ou d'oublis. La conséquence en serait un départ retardé ou des pensions moindres que ce que vos cotisations devraient vous apporter. C'est pourquoi un audit approfondi de vos acquis et un suivi réguliers sont dans votre cas indispensables car 100% de vos revenus futurs dépendent directement de votre activité professionnelle et des droits correspondants. ",
      };
    }
    if (result5 === "A16") {
      createDocumentDto.risqueTraindevie = {
        status: "nuage",
        text: "Vous avez fait pour l'instant le choix de faire reposer vos revenus futurs , lors de la liquidation de votre retraite, sur les seuls régimes obligatoires. Durant votre carrière une personne a partagé votre vie. Vous avez des devoirs vis-à-vis de cette personne, notamment d'être certain de pouvoir lui apporter une qualité de vie confortable.  Mais vous n'êtes tout de même pas à l'abri, sur les régimes obligatoires  d'erreurs ou d'oublis. La conséquence en serait un départ retardé ou des pensions moindres que ce que vos cotisations devraient vous apporter.  C'est pourquoi, un audit approfondi de vos acquis et un suivi régulier est dans votre cas indispensable car 100% de vos revenus futurs dépendent directement de votre activité professionnelle et des droits correspondants. ",
      };
    }
    if (result5 === "A17") {
      createDocumentDto.risqueTraindevie = {
        status: "nuage",
        text: "Vous n'êtes  pas à l'abri, sur les régimes obligatoires,  d'erreurs ou d'oublis. La conséquence en serait un départ retardé ou des pensions moindres que ce que vos cotisations devraient vous apporter. C'est pourquoi, un audit approfondi de vos acquis et un suivi réguliers sont indispensables dans votre cas car 100% de vos revenus futurs dépendent directement de votre activité professionnelle et des droits correspondants. ",
      };
    }

    if (result6 === "A11") {
      createDocumentDto.risqueReversion = {
        status: "orage",
        text: "Dans les règles actuelles de réversion, il faut être marié pour que les droits puissent s'exercer. Dans le cas du concubinage ou du PACS, aucune réversion n'est prévue pour le partenaire. Vous devez prendre des mesures pour protéger la personne qui partage votre vie. ",
      };
    }
    if (result6 === "A12") {
      console.log(
        createDocumentDto.avezVousEte,
        createDocumentDto.avezVousEte.includes("Salarié du secteur privé")
      );
      if (createDocumentDto.avezVousEte.includes("Salarié du secteur privé")) {
        createDocumentDto.risqueReversion = {
          status: "soleil",
          text: "Dans les règles actuelles de réversion, il faut être marié pour que les droits puissent s'exercer. Comme en plus vous annoncez ne pas être divorcé,  il n'y a pas de partage de pension à envisager. Attention tout de même, il y a un frein à la réversion du régime de base quand on est salarié la réversion est sous condition de ressources du conjoint survivant (uniquement sur le régime de base). Il est recommandé d'estimer ses ressources propres afin de prendre les mesures nécessaires de protection du conjoint si nécessaire.",
        };
      } else {
        createDocumentDto.risqueReversion = {
          status: "soleil",
          text: "Dans les règles actuelles de réversion, il faut être marié pour que les droits puissent s'exercer. Comme en plus vous annoncez ne pas être divorcé,  il n'y a pas de partage de pension à envisager. Attention tout de même, il peut y avoir dans certains régimes un frein à la réversion. ",
        };
      }
    }
    if (result6 === "A13") {
      createDocumentDto.risqueReversion = {
        status: "soleil",
        text: "Comme vous n'avez pas de conjoint ou d'ex conjoint à protéger, ce diagnostic ne vous concerne pas.",
      };
    }
    if (result6 === "A14") {
      createDocumentDto.risqueReversion = {
        status: "nuage",
        text: "Vous nous avez signalé que vous étiez marié mais également divorcé. Les réversions sont soumises dans tous les cas de figure à partage au pro rata temporis des temps de mariage. Dans certains régimes, à cela peuvent s'ajouter des conditions de ressources, voire des réversions aux enfants. Ce chapitre est un des plus délicats à traiter et ne peut se faire qu'au cas par cas. ",
      };
    }
    if (result6 === "A15") {
      createDocumentDto.risqueReversion = {
        status: "soleil",
        text: "Comme vous n'avez pas de conjoint ou d'ex conjoint à protéger, ce diagnostic ne vous concerne pas.",
      };
    }
    if (result6 === "A16") {
      createDocumentDto.risqueReversion = {
        status: "nuage",
        text: "Dans les cas particuliers, une étude personnalisée est indispensable. Notamment quand vous mixez les régimes de plusieurs pays. ",
      };
    }

    return this.documentService.create(createDocumentDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.documentService.findAll();
  }

  @Public()
  @Get("archived")
  findArchived() {
    return this.documentService.findArchived();
  }

  @Public()
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.documentService.findOne(id);
  }

  @Public()
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateDocumentDto: UpdateDocumentDto
  ) {
    return this.documentService.update(id, updateDocumentDto);
  }

  @Public()
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.documentService.remove(id);
  }
}
