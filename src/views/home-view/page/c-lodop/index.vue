<template>
  <div id="c-lodop" class="container">
    <el-row>
      <el-col>
        <a href="http://www.lodop.net/">官网</a>
        <el-button type="primary" @click="initPrint">初始化实例</el-button>
        <el-button type="primary" @click="buttonOnClick(1)">
          测试打印1
        </el-button>
        <el-button type="primary" @click="buttonOnClick(2)">
          测试纸张大小2
        </el-button>
        <el-button type="primary" @click="buttonOnClick(3)">
          测试TEXT,TABLE,SHAPE 3
        </el-button>
        <el-button type="primary" @click="buttonOnClick(4)">
          测试PRINT_SETUP 4
        </el-button>
        <el-button type="primary" @click="buttonOnClick(5)">
          测试PRINT_DESIGN 5
        </el-button>
        <el-button type="primary" @click="buttonOnClick(6)">
          测试背景水印 6
        </el-button>
        <el-button type="primary" @click="buttonOnClick(7)">
          测试 二维码
        </el-button>
        <el-button type="primary" @click="buttonOnClick(8)">测试</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-select v-model="a" @change="selectOnChange">
          <el-option
            v-for="item in prointDevice"
            :label="item.label"
            :value="item.value"
            :key="item.val"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getLodop } from "./LodopFuncs.js";

export default {
  name: 'CLodop',
  data() {
    return {
      name: "黄金亮",
      lodop: getLodop(),
      a: 0 // 打印机 索引
    };
  },
  computed: {
    // 获取打印机列表
    prointDevice() {
      if (this.lodop) {
        const arr = [];
        const iCount = this.lodop.GET_PRINTER_COUNT();
        // console.log('打印机数量：', iCount);
        for (let i = 0; i < iCount; i++) {
          const strPName = this.lodop.GET_PRINTER_NAME(i);
          // console.log('打印机名称：', strPName);
          arr.push({
            value: i,
            label: strPName
          });
        }
        return arr;
      } else {
        return [
          {
            label: "未检测到打印机",
            value: 0
          }
        ];
      }
    }
  },
  mounted() {
    this.initPrint();
  },
  methods: {
    initPrint() {
      if (!this.lodop) {
        this.lodop = getLodop();
        console.log("打印cLodop实例：", this.lodop);
        if (!this.lodop) {
          return;
        }
        this.lodop.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", true); // 预览打印后自动关闭
      }
    },
    buttonOnClick(type) {
      const lodop = this.lodop;
      console.log("测试按钮被点击:", type);

      switch (type) {
        case 1:
          // 2100,2970 不要通过改变尺寸顺序来改变预览横纵，这样会导致视觉上是横向，单打印出结果是纵向纸横向数据。
          lodop.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          lodop.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", true); // 横向打印的预览默认旋转90度（正向显示）默认false。
          lodop.ADD_PRINT_HTML(
            0,
            0,
            "100%",
            "100%",
            "<div style='height: 760px;background-color: red;' >你好世界</div>"
          );
          lodop.On_Return = function(taskId, value) {
            console.log("taskId:", taskId);
            console.log("value:", value);
          };
          lodop.PREVIEW(); // PREVIEW(oView,iW,iH) 文档未写，常见问题  28.如何正确理解C-Lodop预览模式
          break;
        case 2:
          lodop.SET_PRINT_PAGESIZE(0, "120px", "140px");
          lodop.ADD_PRINT_HTML(
            0,
            0,
            "100%",
            "100%",
            "<div style='height: 100px;background-color: red;' >你好世界</div>"
          );
          lodop.PREVIEW(); // PREVIEW(oView,iW,iH) 文档未写，常见问题  28.如何正确理解C-Lodop预览模式 也可通过设置显示模改变配置
          break;
        case 3:
          lodop.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          lodop.SET_PRINT_STYLE("FontSize", 19);
          lodop.ADD_PRINT_TEXT(
            10,
            10,
            200,
            200,
            "天命之谓性2，率性之谓道3，修道之谓教4。道也者，不可须臾离也，可离非道也。是故君子戒慎乎其所不睹5，恐惧乎其所不闻6。莫见乎隐7，莫显乎微，故君子慎其独也8。喜怒哀乐之未发9，谓之中10；发而皆中节11，谓之和12；中也者，天下之大本也13；和也者，天下之达道也14。致中和15，天地位焉16，万物育焉17。仲尼曰18：“君子中庸，小人反中庸，君子之中庸也，君子而时中19；小人之中庸也，小人而无忌惮也。”子曰：“中庸其至矣乎20！民鲜能久矣21！”子曰：“道之不行也22，我知之矣：知者过之23，愚者不及也。道之不明也，我知之矣：贤者过之，不肖者不及也。人莫不饮食也，鲜能知味也。”子曰：“道其不行矣夫24！”子曰：“舜其大知也与25！舜好问而好察迩言26，隐恶而扬善，执其两端，用其中于民，其斯以为舜乎！”子曰：“人皆曰予知，驱而纳诸罟擭陷阱之中27，而莫之知辟也28。人皆曰予知，择乎中庸，而不能期月守也29。”子曰：“回之为人也30，择乎中庸，得一善，则拳拳服膺弗失之矣31。”子曰：“天下国家可均也32，爵禄可辞也33，白刃可蹈也34，中庸不可能也。”子路问强35，子曰：“南方之强与？北方之强与？抑而强与36？宽柔以教，不报无道37，南方之强也，君子居之38。衽金革39，死而不厌40，北方之强也，而强者居之。故君子和而不流41，强哉矫42！中立而不倚43，强哉矫！国有道，不变塞焉44，强哉矫！国无道，至死不变，强哉矫！”子曰：“素隐行怪45，后世有述焉，吾弗为之矣。君子遵道而行，半涂而废，吾弗能已矣46。君子依乎中庸，遁世不见知而不悔47，唯圣者能之。”君子之道，费而隐48。夫妇之愚49，可以与知焉50，及其至也51，虽圣人亦有所不知焉。夫妇之不肖52，可以能行焉；及其至也，虽圣人亦有所不能焉。天地之大也，人犹有所憾53。故君子语大54，天下莫能载焉；语小，天下莫能破焉55。《诗》云：“鸢飞戾天56，鱼跃于渊57。”言其上下察也58。君子之道，造端乎夫妇59，及其至也，察乎天地。子曰：“道不远人60，人之为道而远人，不可以为道。《诗》云：‘伐柯，伐柯61，其则不远。’执柯以伐柯，睨而视之62，犹以为远。故君子以人治人，改而止。忠恕违道不远63，施诸己而不愿，亦勿施于人。君子之道四，丘未能一焉64，所求乎子，以事父65，未能也；所求乎臣，以事君，未能也；所求乎弟，以事兄，未能也；所求乎朋友，先施之，未能也。庸德之行，庸言之谨；有所不足，不敢不勉，有余，不敢尽；言顾行，行顾言，君子胡不慥慥尔66！”君子素其位而行67，不愿乎其外。素富贵，行乎富贵；素贫贱，行乎贫贱；素夷狄68，行乎夷狄；素患难行乎患难，君子无入而不自得焉。在上位不陵下，在下位不援上，正己而不求于人，则无怨。上不怨天，下不尤人。故君子居易以俟命69。小人行险以徼幸70。子曰：“射有似乎君子71，失诸正鹄72，反求诸其身。”君子之道，辟如行远必自迩，辟如登高必自卑73。《诗》曰：“妻子好合，如鼓瑟琴74。兄弟既翕75，和乐且耽76。宜尔室家，乐尔妻帑77。”子曰：“父母其顺矣乎！”子曰：“鬼神之为德78，其盛矣乎？视之而弗见，听之而弗闻，体物而不可遗，使天下之人齐明盛服，以承祭祀。洋洋乎如在其上，如在其左右。《诗》曰：‘神之格思78，不可度思79！矧可射思80！’夫微之显81，诚之不可掩如此夫82。”子曰：“舜其大孝也与！德为圣人，尊为天子，富有四海之内。宗庙飨之83，子孙保之。故大德必得其位，必得其禄。必得其名，必得其寿，故天之生物，必因其材而笃焉。故栽者培之，倾者覆之。《诗》曰：‘嘉乐君子84，宪宪令德85。宜民宜人，受禄于天，保佑命之，自天申之。’故大德者必受命86。”子曰：“无忧者，其惟文王乎87！以王季为父88，以武王为子89，父作之，子述之90。武王缵大王、王季、文王之绪91，壹戎衣而有天下92。身不失天下之显名，尊为天子，富有四海之内。宗庙飨之，子孙保之。武王末受命，周公成文、武之德93，追王大王、王季，上祀先公以天子之礼。斯礼也，达乎诸侯大夫，及士庶人。父为大夫，子为士，葬以大夫，祭以士。父为士，子为大夫，葬以士，祭以大夫。期之丧，达乎大夫。三年之丧，达乎天子。父母之丧，无贵贱一也。”子曰：“武王、周公，其达孝矣乎94！夫孝者，善继人之志，善述人之事者也。春秋修其祖庙95，陈其宗器96，设其裳衣97，荐其时食98。宗庙之礼，所以序昭穆也99。序爵100，所以辨贵贱也。序事101，所以辨贤也。旅酬下为上，所以逮贱也102。燕毛103，所以序齿也。践其位，行其礼，奏其乐，敬其所尊，爱其所亲，事死如事生，事亡如事存，孝之至也。郊社之礼，所以事上帝也104。宗庙之礼，所以祀乎其先也。明乎郊社之礼105、禘尝之义106，治国其如示诸掌乎！”哀公问政107。子曰：“文武之政，布在方策108。其人存，则其政举；其人亡，则其政息。人道敏政，地道敏树。夫政也者，蒲卢也109。故为政在人，取人以身，修身以道，修道以仁。仁者人也。亲亲为大110；义者宜也。尊贤为大。亲亲之杀111，尊贤之等，礼所生也。在下位不获乎上，民不可得而治矣112！故君子不可以不修身；思修身，不可以不事亲；思事亲，不可以不知人，思知人，不可以不知天。天下之达道五，所以行之者三。曰：君臣也，父子也，夫妇也，昆弟也，朋友之交也，五者天下之达道也。知，仁，勇，三者天下之达德也，所以行之者一也。或生而知之，或学而知之，或困而知之，及其知之一也。或安而行之，或利而行之，或勉强而行之，及其成功，一也。”子曰：“好学近乎知，力行近乎仁，知耻近乎勇。知斯三者，则知所以修身；知所以修身，则知所以治人；知所以治人，则知所以治天下国家矣。凡为天下国家有九经113，曰：修身也。尊贤也，亲亲也，敬大臣也，体群臣也。子庶民也114，来百工也115，柔远人也116，怀诸侯也117。修身则道立，尊贤则不惑，亲亲则诸父昆弟不怨，敬大臣则不眩，体群臣则士之报礼重，子庶民则百姓劝，来百工则财用足，柔远人则四方归之，怀诸侯则天下畏之。齐明盛服，非礼不动。所以修身也；去谗远色，贱货而贵德，所以劝贤也；尊其位，重其禄，同其好恶118，所以劝亲亲也；官盛任使119，所以劝大臣也；忠信重禄，所以劝士也；时使薄敛120，所以劝百姓也；日省月试121，既廪称事122，所以劝百工也；送往迎来，嘉善而矜不能，所以柔远人也；继绝世123，举废国124，治乱持危。朝聘以时125，厚往而薄来，所以怀诸侯也。凡为天下国家有九经，所以行之者一也。凡事豫则立，不豫则废。言前定则不跲126，事前定则不困，行前定则不疚，道前定则不穷。在下位不获乎上，民不可得而治矣。获乎上有道，不信乎朋友，不获乎上矣；信乎朋友有道，不顺乎亲，不信乎朋友矣；顺乎亲有道，反诸身不诚，不顺乎亲矣；诚身有道，不明乎善，不诚乎身矣。诚者，天之道也；诚之者，人之道也。诚者不勉而中，不思而得，从容中道，圣人也。诚之者，择善而固执之者也。博学之，审问之127，慎思之，明辨之，笃行之。有弗学，学之弗能，弗措也128；有弗问，问之弗知，弗措也；有弗思，思之弗得，弗措也；有弗辨，辨之弗明，弗措也；有弗行，行之弗笃，弗措也。人一能之己百之，人十能之己千之。果能此道矣。虽愚必明，虽柔必强。”自诚明谓之性129。自明诚谓之教130。诚则明矣，明则诚矣。唯天下至诚，为能尽其性；能尽其性，则能尽人之性；能尽人之性，则能尽物之性；能尽物之性，则可以赞天地之化育131；可以赞天地之化育，则可以与天地参矣132。其次致曲133。曲能有诚，诚则形，形则著，著则明，明则动，动则变，变则化。唯天下至诚为能化。至诚之道，可以前知。国家将兴，必有祯祥；国家将亡，必有妖孽134。见乎著龟135，动乎四体。祸福将至，善必先知之；不善必先知之。故至诚如神。诚者，自成也，而道，自道也。诚者物之终始，不诚无物。是故君子诚之为贵。诚者非自成己而已也136，所以成物也。成己仁也；成物知也。性之德也，合外内之道也，故时措之宜也137。故至诚无息，不息则久，久则征138；征则悠远，悠远则博厚，博厚则高明。博厚所以载物也；高明所以覆物也；悠久所以成物也。博厚配地，高明配天，悠久无疆。如此者不见而章，不动而变，无为而成。天地之道，可一言而尽也。其为物不贰，则其生物不测。天地之道，博也，厚也，高也，明也，悠也，久也。今夫天，斯昭昭之多，及其无穷也，日月星辰系焉，万物覆焉。今夫地，一撮土之多。及其广厚，载华岳而不重，振河海而不泄，万物载焉。今夫山，一卷石之多139，及其广大，草木生之，禽兽居之，宝藏兴焉，今夫水，一勺之多，及其不测，鼋、鼍、蛟龙、鱼鳖生焉140，货财殖焉。《诗》曰：“惟天之命，于穆不已！”盖曰天之所以为天也。“于乎不显141，文王之德之纯！”盖曰文王之所以为文也，纯亦不已。大哉，圣人之道！洋洋乎，发育万物，峻极于天。优优大哉！礼仪三百，威仪三千142。待其人然后行。故曰：苟不至德，至道不凝焉。故君子尊德性而道问学143。致广大而尽精微。极高明而道中庸。温故而知新，敦厚以崇礼。是故居上不骄，为下不倍；国有道，其言足以兴；国无道，其默足以容。《诗》曰：“既明且哲，以保其身。”其此之谓与！子曰：“愚而好自用144，贱而好自专145，生乎今之世，反古之道：如此者，灾及其身者也。”非天子，不议礼，不制度，不考文146。今天下车同轨，书同文，行同伦。虽有其位，苟无其德，不敢作礼乐焉；虽有其德。苟无其位，亦不敢作礼乐焉。子曰：“吾说夏礼，杞不足徵也147。吾学殷礼，有宋存焉。吾学周礼，今用之，吾从周。”“王天下有三重焉148，其寡过矣乎！上焉者虽善无徵149，无徵不信，不信民弗从；下焉者虽善不尊，不尊不信，不信民弗从。故君子之道：本诸身，徵诸庶民，考诸三王而不缪150，建诸天地而不悖，质诸鬼神而无疑，百世以俟圣人而不惑。质诸鬼神而无疑，知天也；百世以俟圣人而不惑，知人也。是故君子动而世为天下道，行而世为天下法，言而世为天下则。远之则有望，近之则不厌。《诗》曰：‘在彼无恶，在此无射。庶几夙夜151，以永终誉！’君子未有不如此，而蚤有誉于天下者152。”仲尼祖述尧舜153，宪章文武154：上律天时，下袭水土。辟如天地之无不持载，无不覆帱155，辟如四时之错行156，如日月之代明157。万物并育而不相害，道并行而不相悖，小德川流，大德敦化158，此天地之所以为大也。唯天下至圣为能聪明睿知，足以有临也；宽裕温柔159，足以有容也；发强刚毅，足以有执也；齐庄中正160，足以有敬也；文理密察161，足以有别也。溥博渊泉162，而时出之。溥博如天，渊泉如渊。见而民莫不敬，言而民莫不信，行而民莫不说。是以声名洋溢乎中国，施及蛮貊163。舟车所至，人力所通，天之所覆，地之所载，日月所照，霜露所队164，凡有血气者，莫不尊亲，故曰配天。唯天下至诚，为能经纶天下之大经165，立天下之大本，知天地之化育。夫焉有所倚？肫肫其仁166！渊渊其渊！浩浩其天！苟不固聪明圣知达天德者，其孰能知之？《诗》曰：“衣锦尚絅167”，恶其文之著也。故君子之道，闇然而日章168；小人之道，的然而日亡169。君子之道：淡而面不厌，简而文，温而理，知远之近，知风之自，知微之显，可与入德矣。《诗》云：“潜虽伏矣，亦孔之昭！”故君子内省不疚，无恶于志170。君子之所不可及者，其唯人之所不见乎！《诗》云：“相在尔室，尚不愧于屋漏171。”故君子不动而敬，不言而信。《诗》曰：“奏假无言172，时靡有争。”是故君子不赏而民劝，不怒而民威于鈇钺173。《诗》曰：“不显惟德！百辟其刑之174。”是故君子笃恭而天下平。《诗》云：“予怀明德，不大声以色。”子曰：“声色之于以化民。末也。”《诗》曰：“德輶如毛175。”毛犹有伦，上天之载，无声无臭176，至矣！"
          );
          lodop.ADD_PRINT_TABLE(
            210,
            210,
            300,
            100,
            "<table border='1'><tr><td>11</td>  <td>12</td></tr><tr> <td>21</td> <td>22</td></tr></table>"
          );
          lodop.ADD_PRINT_SHAPE(4, 220, 59, 100, 60, 0, 1, "#FF0000");
          lodop.PREVIEW();
          break;
        case 4:
          lodop.SET_PRINT_PAGESIZE(0, "120px", "140px");
          lodop.ADD_PRINT_HTML(
            0,
            0,
            "100%",
            "100%",
            "<div style='height: 100px;background-color: red;' >你好世界</div>"
          );
          lodop.PRINT_SETUP();
          break;
        case 5:
          lodop.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          lodop.ADD_PRINT_HTML(
            0,
            0,
            "100%",
            "100%",
            "<div style='height: 100px;background-color: red;' >你好世界</div>"
          );
          lodop.PRINT_DESIGN();
          break;
        case 6:
          lodop.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          lodop.ADD_PRINT_HTML(
            0,
            0,
            "100%",
            "100%",
            "<div style='height: 100px;background-color: red;' >你好世界</div>"
          );
          // 0参数代表从当前第0个项目开始
          lodop.ADD_PRINT_TEXT(550, 480, 700, 460, "秘密文件"); // 水印距离顶部及做不的位置和宽高，参数为：顶 左 宽 高 水印名称
          lodop.SET_PRINT_STYLEA(0, "FontSize", 60); // 水印字体大小
          lodop.SET_PRINT_STYLEA(0, "FontColor", "#EEC591"); // 字体颜色
          lodop.SET_PRINT_STYLEA(0, "ItemType", 1);
          lodop.SET_PRINT_STYLEA(0, "Angle", 50); // 打印水印字体偏转角度
          lodop.SET_PRINT_STYLEA(0, "Repeat", false); // 是否重复打印
          lodop.PREVIEW();
          break;
        case 7:
          lodop.SET_PRINT_PAGESIZE(1, 0, 0, "A4");
          lodop.ADD_PRINT_BARCODE(28, 34, 307, 47, "128A", "123456789012");
          lodop.ADD_PRINT_BARCODE(88, 32, 206, 78, "128B", "123456789012");
          lodop.SET_PRINT_STYLEA(0, "FontSize", 18);
          lodop.ADD_PRINT_BARCODE(107, 255, 161, 64, "128C", "888888");
          lodop.SET_PRINT_STYLEA(0, "Color", "#FF0000");
          lodop.ADD_PRINT_BARCODE(179, 42, 130, 47, "128Auto", "12345678901");
          lodop.ADD_PRINT_BARCODE(252, 42, 153, 54, "EAN8", "12345678");
          lodop.SET_PRINT_STYLEA(0, "Angle", 180);
          lodop.ADD_PRINT_BARCODE(173, 244, 235, 172, "EAN13", "1234567890123");
          lodop.SET_PRINT_STYLEA(0, "Angle", 35);
          lodop.ADD_PRINT_BARCODE(351, 34, 360, 36, "EAN128A", "123456789012");
          lodop.SET_PRINT_STYLEA(0, "ShowBarText", 0);
          lodop.ADD_PRINT_BARCODE(403, 34, 360, 47, "EAN128B", "123456789012");
          lodop.SET_PRINT_STYLEA(0, "AlignJustify", 2);
          lodop.ADD_PRINT_BARCODE(462, 34, 360, 47, "EAN128C", "123456789012");
          lodop.ADD_PRINT_BARCODE(
            513,
            34,
            360,
            47,
            "Code39",
            "*123ABC4567890*"
          );
          lodop.SET_PRINT_STYLEA(0, "Color", "#0000FF");
          lodop.ADD_PRINT_BARCODE(
            570,
            34,
            360,
            47,
            "39Extended",
            "*1234567890*"
          );
          lodop.ADD_PRINT_BARCODE(
            621,
            34,
            360,
            47,
            "2_5interleaved",
            "123456789012"
          );
          lodop.ADD_PRINT_BARCODE(
            677,
            34,
            360,
            47,
            "2_5industrial",
            "123456789012"
          );
          lodop.ADD_PRINT_BARCODE(
            729,
            34,
            360,
            47,
            "2_5matrix",
            "123456789012"
          );
          lodop.SET_PRINT_STYLEA(0, "Color", "#408080");
          lodop.ADD_PRINT_BARCODE(787, 34, 360, 47, "UPC_A", "089600124569");
          lodop.ADD_PRINT_BARCODE(844, 34, 135, 64, "UPC_E0", "08960007");
          lodop.ADD_PRINT_BARCODE(65, 595, 45, 95, "UPC_E1", "1122333");
          lodop.SET_PRINT_STYLEA(0, "Angle", 90);
          lodop.ADD_PRINT_BARCODE(87, 676, 57, 122, "UPCsupp2", "12345");
          lodop.SET_PRINT_STYLEA(0, "Angle", 90);
          lodop.ADD_PRINT_BARCODE(
            359,
            435,
            78,
            181,
            "UPCsupp5",
            "123456789012"
          );
          lodop.SET_PRINT_STYLEA(0, "Angle", 90);
          lodop.ADD_PRINT_BARCODE(309, 579, 44, 238, "Code93", "BJ100080");
          lodop.SET_PRINT_STYLEA(0, "Angle", 90);
          lodop.ADD_PRINT_BARCODE(
            241,
            663,
            73,
            246,
            "93Extended",
            "123456789012"
          );
          lodop.SET_PRINT_STYLEA(0, "Angle", -90);
          lodop.ADD_PRINT_BARCODE(583, 419, 58, 251, "MSI", "123456789012");
          lodop.SET_PRINT_STYLEA(0, "Color", "#FF00FF");
          lodop.SET_PRINT_STYLEA(0, "ShowBarText", 0);
          lodop.SET_PRINT_STYLEA(0, "Angle", 90);
          lodop.ADD_PRINT_BARCODE(589, 504, 74, 270, "PostNet", "123456789012");
          lodop.SET_PRINT_STYLEA(0, "Angle", 90);
          lodop.ADD_PRINT_BARCODE(
            565,
            626,
            115,
            253,
            "Codabar",
            "123456789012"
          );
          lodop.SET_PRINT_STYLEA(0, "Angle", 285);
          lodop.ADD_PRINT_BARCODE(
            30,
            405,
            176,
            67,
            "PDF417",
            "我是pdf417value"
          );
          lodop.ADD_PRINT_BARCODE(
            130,
            434,
            168,
            146,
            "QRCode",
            "1234567890版本7的最大值是122个字符123123"
          );
          lodop.SET_PRINT_STYLEA(0, "GroundColor", "#0080FF");

          lodop.PREVIEW();
          break;
        default:
          break;
      }
    },
    selectOnChange(type) {
      console.log("打印机类型：", type);
      // this.lodop.SET_PRINT_MODE("WINDOW_DEFPRINTER", type); // 又不生效啦- -。
      this.lodop.SET_PRINTER_INDEXA(type); // 设置成功后，未触发回调
      this.lodop.On_Return = (taskId, value) => {
        console.log("taskId:", taskId);
        console.log("value:", value);
        if (value === "ok") {
          this.$message({
            type: "success",
            message: "设置成功",
            showClose: true
          });
        } else {
          this.$message({
            type: "error",
            message: "设置失败",
            showClose: true
          });
        }
      };
    }
  }
};
</script>
<style scoped lang="scss"></style>
