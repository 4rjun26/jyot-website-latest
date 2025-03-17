import React from "react";
import { Box, Text,Image,VStack,Divider } from "@chakra-ui/react";


export default function Acharya(){
    const timelineData = [
        { date: "26 Oct, 1957", description: "A Legend was Born! Born as Naveen Khimji Mota." },
        { date: "29 Apr, 1979", description: "The Initiation Ceremony – Diksha. The initiation ceremony took place at Pindwada, Rajasthan." },
        { date: "31 Jan, 1996", description: "Gani Padvi. Was bestowed with Gani padvi at Gowalia Tank, Mumbai." },
        { date: "11 Oct, 1992", description: "Established Gitarth Ganga. A Jain research institute located in Ahmedabad." },
        { date: "2007", description: "Raksha Dharma Abhiyan. When Kesariyaji Tirth was under crisis, a public movement called Raksha Dharma Abhiyan was carried out under the aegis of H.H. Jainacharya Shri Yugbhushan Suriji." },
        { date: "22 Apr, 2008", description: "Upadhyay Padvi. Was bestowed with Upadhyay padvi at Devlali, Nasik." },
        { date: "23 Apr, 2008", description: "Acharya Padvi. Was bestowed with Acharya padvi at Devlali, Nasik." },
        { date: "2009", description: "Jyot. Jyot, a religious organisation was established under the guidance of H.H. Jainacharya Shri Yugbhushan Suriji. It is a perfect blend of modernistic ideas & religious beliefs." },
        { date: "5-15 Dec, 2009", description: "Gyan Jyot – Ahmedabad. The exhibition unveiled systematic & chronological steps of development of a soul from element level to completeness from knowledge perspective." },
        { date: "2011", description: "Ek Cheeze Milegi Wonderful. It is a movie conceptualized by H.H. Jainacharya Shri Yugbhushan Suriji. It not only proves existence of soul but also differentiates between materialistic pleasures & spiritual pleasures thus redefining the source of true & everlasting happiness!!" },
        { date: "2011", description: "Journey to Enlightenment – A set of 3 DVDs. A set of 3 DVDs which takes an aspirant on a virtual journey of development of oneself." },
        { date: "2009", description: "Gyan Jyot – Set of books. Limited edition of Gyan Jyot Books was published by Jyot keeping in view the various demands from the Jain Sadhus & Sadhvis." },
        { date: "Dec 2011", description: "Jyot – Bangalore. A knowledge exhibition similar to the one held in Ahmedabad was organized in Bangalore." },
        { date: "20 Jun, 2014", description: "Vijayprashthan – 20 Dikshas Ahmedabad. Never seen before in Ahmedabad, 20 mumukshus got initiated under the aegis of H.H. Jainacharya Shri Yugbhushan Suriji." },
        { date: "19-21 Mar, 2016", description: "Shatrujay Aadinath Mahima Mahotsav. A unique celebration of Fagan Sud 13 at Palitana." },
        { date: "Feb, 2017", description: "Manilaxmi Tirth Pratishtha. Manilaxmi Tirth is a beautiful temple located at Manej village Anand, in Gujarat was built under the guidance of H.H. Jainacharya Yugbhushan Suri." },
        { date: "14 Apr, 2017", description: "Mahavir Janm Kalyanak. A first of its kind Mahavir Janma Kalyanak Utsav was carried out under the aegis of H.H. Jainacharya Shri Yugbhushan Suriji where a 60 feet idol of Shri Mahavirswami appeared from Sabarmati river on the riverfront." },
        { date: "29 May, 2017", description: "Acharya Padvi Pradan – The Delegation of Rights. H.H. Arihantsagarji Maharaj & H.H. Kalpbhushan Maharaj were bestowed with Acharya Padvi by H.H. Jainacharya Shri Yugbhushan Suriji." },
        { date: "2017", description: "Chal Maan Jitva Jaiye. H.H. Jainacharya Shri Yugbhushan Suriji is the conceptualizer for the award-winning movie CMJJ that highlighted the importance of moral values & ethics in society." },
        { date: "22 Jan, 2018", description: "Vijayprashthan 2 – 16 Dikshas Mumbai. 16 Young & talented mumukshus got initiated under the aegis of H.H. Jainacharya Shri Yugbhushan Suriji." },
        { date: "2018", description: "Khoj – In Search of Happiness. A seminar organised for youngsters in Pune." },
        { date: "2018", description: "Save Shikharji Movement. A nationwide movement against the unjust activities of Jharkhand Government hampering the sanctity of Jain’s most pious place of worship – Shikharji was organized by Jyot under the able guidance of H.H. Jainacharya Shri Yugbhushan Suriji." },
        { date: "12 Jan, 2019", description: "Khoj – Redefine Your Career Graph. An eye-opening seminar on career scope in India & abroad, Indian culture vs Western culture, ‘internal development be the actual goal of life’ was specially organised for youngsters." },
        { date: "30 Jan, 2020", description: "Vijayprashthan 3 – 9 Dikshas Mumbai. 9 Young & talented mumukshus got initiated under the aegis of H.H. Jainacharya Shri Yugbhushan Suriji." },
        { date: "04 Feb, 2020", description: "Gachchadhipati Padvi. H.H. Jainacharya Shri Yugbhushan Suriji was bestowed with Gachchadhipati Padvi to become ‘H.H. Gachchadhipati Acharyadevesh Shrimadvijay Yugbhushan Suriji Maharaja’." }
      ];
    return(
        <>
            <Text w={'full'} textTransform={'uppercase'} textAlign={'center'} fontSize={'4xl'} fontFamily={"Oswald, sans-serif"}>
            acharya yugbhushan surij
            </Text>
            <Text w={'full'} mt={'20px'} mb={'20px'} p={'3px 10px'} textTransform={'uppercase'} textAlign={'center'} fontSize={'5xl'} fontFamily={"Oswald, sans-serif"}>
            “ONLY EXTERNAL SUCCESS WITH NO INTERNAL GAINS IS WORTHLESS & HOLLOW…”
            </Text>
            <Text w={'full'} textTransform={'uppercase'} textAlign={'center'} fontWeight={'bold'} fontSize={'3xl'} fontFamily={"Oswald, sans-serif"}>
            JAINACHARYA YUGBHUSHANSURIJI – A JEWEL TO JAINISM!
            </Text>
            <Box w={'300px'} h={'300px'} m={'10px auto'} borderRadius={'full'}>
                <Image alt="sample" src="https://jyot.in/wp-content/uploads/2022/05/Gachchadhipati-Acharya-Yugbhushansuri-Maharaja-At-Khoj-scaled-e1653298401153.jpg" 
                    w={'full'}
                    h={'full'}
                    transitionDuration={'1s'}
                    
                    _hover={{boxShadow:'dark-lg'}}
                    // boxShadow={'dark-lg'}
                    objectFit={'cover'}
                    borderRadius={'full'}
                />
            </Box>
            <Box w={'full'} mt={'20px'} mb={'20px'} p={'3px 40px'} fontSize={'md'}>
              <Text> An Invincible decoder of most complex subject matters, cognoscente in various fields & a connoisseur, Jainacharya Yugbhushansuriji is undoubtedly one of the greatest knowledge treasure troves in today’s time.</Text>
              
            </Box>
            

             <Box textAlign={'left'} w={'full'} maxW={'900px'} m={'20px auto'}>
                      {timelineData.map((item, index) => (
                        <>
                        <Text fontFamily={"Oswald, sans-serif"} fontSize={'2xl'}>{item.date}</Text>
                        <Divider w={'100px'} border={'3px solid brown'} />
                        <Text ml={'30px'} mb={'10px'} color={'rgb(100,100,100)'} mt={'10px'}>{item.description}</Text>
                        </>
                    ))}
                        </Box>
        </>
    );
}