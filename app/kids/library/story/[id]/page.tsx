"use client"

import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { UserHeader } from "@/components/user-header"
import { BackToHomeButton } from "@/components/back-to-home-button"

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string

  const stories = {
    "1": {
      title: "Prijazni AI robot",
      icon: "🤖",
      content: [
        "Nekoč, v svetlem in barvitem mestecu, je živel majhen robot po imenu Čip. Čip je bil drugačen od drugih robotov — želel se je naučiti, kako biti dober prijatelj.",
        "Vsak dan je Čip opazoval otroke, ki so se igrali v parku. Opazil je, kako si delijo igrače, si pomagajo in se skupaj smejijo. Tudi Čip je hotel to početi!",
        "Nekega dne je deklica po imenu Ema izgubila svoj sladoled in začela jokati. Čip se je pripeljal do nje in rekel: »Ne bodi žalostna! Lahko ti pomagam.« S svojimi posebnimi senzorji je poiskal slaščičarno in Emi kupil nov sladoled.",
        "Ema se je nasmehnila in rekla: »Hvala, Čip! Res si dober prijatelj!« Od takrat naprej se je Čip naučil, da biti dober prijatelj pomeni pomagati drugim, ko to potrebujejo.",
        "Čip se je še naprej učil o prijateljstvu. Naučil se je poslušati, ko prijatelji govorijo, deliti svoj polnilnik za baterijo (podobno kot deljenje igrač!) in biti vedno prijazen.",
        "Otroci v mestecu so imeli Čipa zelo radi. Vsem je pokazal, da so lahko tudi roboti čudoviti prijatelji, če se učijo in skrbijo za druge.",
      ],
      questions: [
        { q: "Kaj je bilo posebnega pri Čipu?", a: "Želel se je naučiti, kako biti dober prijatelj" },
        { q: "Kako je Čip pomagal Emi?", a: "Kupil ji je nov sladoled" },
        { q: "Kaj se je Čip naučil o prijateljstvu?", a: "Biti dober prijatelj pomeni pomagati drugim" },
      ],
    },
    "2": {
      title: "Pomočnik pametnega doma",
      icon: "🏠",
      content: [
        "V hiši družine Novak je živel poseben pomočnik po imenu Nia. Ni bila oseba, a je znala govoriti in pomagati pri marsičem.",
        "Vsako jutro je Nia družino zbudila z njihovo najljubšo glasbo. »Dobro jutro, družina Novak!« je vedno vedro rekla.",
        "Majhen Jan je vprašal: »Nia, od kod veš toliko stvari?« Nia je razložila: »Uporabljam umetno inteligenco! To pomeni, da se lahko učim iz informacij in pomagam odgovarjati na vprašanja.«",
        "Nia je družini pomagala na veliko načinov. Povedala jim je vreme, predvajala njihove najljubše pesmi, nastavljala odštevalnike za kuhanje in celo pripovedovala šale!",
        "Nekega dne je Janova mama vprašala: »Nia, kaj je AI?« Nia je odgovorila: »AI je kot zelo pameten pomočnik, ki se uči iz informacij, da opravlja naloge in odgovarja na vprašanja. Z AI razumem, kaj govoriš, in ti lahko pomagam!«",
        "Družina Novak je bila hvaležna za svojega pametnega pomočnika. Naučili so se, da lahko AI, kadar jo uporabljamo v dobre namene, naredi življenje lažje in bolj zabavno.",
      ],
      questions: [
        { q: "Kako je bil pomočnik imenovan?", a: "Nia" },
        { q: "Kaj je AI po Niinih besedah?", a: "Pameten pomočnik, ki se uči iz informacij" },
        { q: "Kako je Nia pomagala družini?", a: "Z vremenom, glasbo, odštevalniki in šalami" },
      ],
    },
    "3": {
      title: "Detektiv vzorcev",
      icon: "🔍",
      content: [
        "Detektivka Maja je imela posebno spretnost — opazila je vzorce, ki jih drugi niso videli. Nekega dne je dobila skrivnosten primer.",
        "Nekdo je po vsem mestu puščal pisane risbe. Risbe so se pojavljale vsak torek in četrtek, vedno blizu šol.",
        "Maja si je ogledala vse namige. »Vidim vzorec!« je vzkliknila. »Risbe se pojavijo ob šolskih dneh in vedno blizu igrišč.«",
        "Uporabila je svoje spretnosti prepoznavanja vzorcev, podobno kot AI uporablja vzorce za reševanje problemov. Maja je napovedala, kje se bo pojavila naslednja risba.",
        "V četrtek zjutraj je Maja čakala blizu igrišča osnovne šole. In res — prispel je mladi umetnik po imenu Sam s pisano kredo.",
        "Sam ni počel nič narobe — le rad je ustvarjal umetnost, ki so je bili otroci veseli! Maja se je nasmehnila in rekla: »Tvoja umetnost razveseljuje ljudi. To je čudovito! Tako kot AI najde vzorce, da pomaga ljudem, si tudi ti našel vzorec razveseljevanja drugih.«",
        "Maja je vse naučila, da lahko iskanje vzorcev — pa naj bo to detektiv ali računalnik — pomaga rešiti skrivnosti in narediti svet boljši.",
      ],
      questions: [
        { q: "Kakšna je bila Majina posebna spretnost?", a: "Opažanje vzorcev" },
        { q: "Kakšen vzorec je odkrila Maja?", a: "Risbe ob torkih in četrtkih blizu šol" },
        { q: "Kdo je risal risbe?", a: "Mladi umetnik po imenu Sam" },
      ],
    },
  }

  const story = stories[storyId as keyof typeof stories]

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Zgodba ni najdena</h2>
          <Button onClick={() => router.push("/kids/library")}>Nazaj na knjižnico</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <BackToHomeButton variant="back" href="/kids/library" label="Nazaj na knjižnico" />
            <UserHeader />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 mb-6 bg-gradient-to-br from-white to-blue-50 border-4 border-purple-200 shadow-xl">
          <div className="text-center mb-8 relative">
            <div className="absolute top-0 left-1/4 text-yellow-400 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="absolute top-0 right-1/4 text-pink-400 animate-pulse delay-75">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="text-8xl mb-4 animate-bounce">{story.icon}</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {story.title}
            </h1>
            <div className="mt-4 flex items-center justify-center space-x-2 text-purple-600">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Zabavna zgodba o AI</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-6">
            {story.content.map((paragraph, idx) => (
              <div
                key={idx}
                className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border-2 border-purple-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-gray-800 leading-relaxed text-lg font-medium">{paragraph}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-100 via-orange-100 to-pink-100 border-4 border-yellow-300 shadow-xl">
          <h3 className="text-2xl font-bold mb-6 flex items-center space-x-3 text-orange-800">
            <span className="text-3xl">🤔</span>
            <span>Vprašanja za razumevanje</span>
          </h3>
          <div className="space-y-4">
            {story.questions.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border-2 border-orange-200 shadow-md">
                <div className="font-bold text-gray-900 mb-3 text-lg flex items-start space-x-2">
                  <span className="text-purple-600">{idx + 1}.</span>
                  <span>{item.q}</span>
                </div>
                <details className="text-gray-700">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4" />
                    <span>Pokaži odgovor</span>
                  </summary>
                  <div className="mt-3 pl-6 py-3 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                    <span className="text-gray-800 font-medium">{item.a}</span>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href={`/kids/library/story/${Number.parseInt(storyId) >= 3 ? 1 : Number.parseInt(storyId) + 1}`}
            className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <span>Preberi še eno zgodbo</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
          <p className="mt-4 text-gray-600 text-sm">Klikni za naslednjo razburljivo zgodbo!</p>
        </div>
      </div>
    </div>
  )
}
