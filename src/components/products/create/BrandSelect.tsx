import { useModal } from '@/hooks';
import { IBrand } from '@/interfaces';
import { IoIosCheckmark } from 'react-icons/io';

const brands: IBrand[] = [
  {
    id: '7',
    slug: 'abercrombie-fitch',
    name: 'Abercrombie & Fitch',
  },
  {
    id: '20',
    slug: 'adidas',
    name: 'Adidas',
  },
  {
    id: '2496',
    slug: 'aeropostale',
    name: 'Aeropostale',
  },
  {
    id: '1170',
    slug: 'american-eagle-outfitters',
    name: 'American Eagle Outfitters',
  },
  {
    id: '1185',
    slug: 'andrea',
    name: 'Andrea',
  },
  {
    id: '70',
    slug: 'banana-republic',
    name: 'Banana Republic',
  },
  {
    id: '86',
    slug: 'bcbg-max-azria',
    name: 'BCBG Max Azria',
  },
  {
    id: '90',
    slug: 'bebe',
    name: 'Bebe',
  },
  {
    id: '1140',
    slug: 'bershka',
    name: 'Bershka',
  },
  {
    id: '12838',
    slug: 'bimba-y-lola',
    name: 'Bimba y lola',
  },
  {
    id: '1358',
    slug: 'burberry',
    name: 'Burberry',
  },
  {
    id: '97',
    slug: 'c-a',
    name: 'C&A',
  },
  {
    id: '105',
    slug: 'calvin-klein',
    name: 'Calvin Klein',
  },
  {
    id: '129',
    slug: 'carolina-herrera',
    name: 'Carolina Herrera',
  },
  {
    id: '1378',
    slug: 'chanel',
    name: 'Chanel',
  },
  {
    id: '1430',
    slug: 'coach',
    name: 'Coach',
  },
  {
    id: '7490',
    slug: 'cuidado-con-el-perro',
    name: 'Cuidado Con El Perro',
  },
  {
    id: '1513',
    slug: 'dolce-gabbana',
    name: 'Dolce & Gabbana',
  },
  {
    id: '3901',
    slug: 'express',
    name: 'Express',
  },
  {
    id: '1596',
    slug: 'forever-21',
    name: 'Forever 21',
  },
  {
    id: '300',
    slug: 'gap',
    name: 'GAP',
  },
  {
    id: '1656',
    slug: 'gucci',
    name: 'Gucci',
  },
  {
    id: '1658',
    slug: 'guess',
    name: 'GUESS',
  },
  {
    id: '381',
    slug: 'h-m',
    name: 'H&M',
  },
  {
    id: '2423',
    slug: 'julio',
    name: 'Julio',
  },
  {
    id: '2421',
    slug: 'kate-spade',
    name: 'Kate Spade',
  },
  {
    id: '521',
    slug: 'kipling',
    name: 'Kipling',
  },
  {
    id: '534',
    slug: 'lacoste',
    name: 'Lacoste',
  },
  {
    id: '1750',
    slug: 'levis',
    name: "Levi's",
  },
  {
    id: '1785',
    slug: 'lob',
    name: 'LOB',
  },
  {
    id: '1816',
    slug: 'louis-vuitton',
    name: 'Louis Vuitton',
  },
  {
    id: '610',
    slug: 'mango',
    name: 'Mango',
  },
  {
    id: '1869',
    slug: 'massimo-dutti',
    name: 'Massimo Dutti',
  },
  {
    id: '1914',
    slug: 'michael-kors',
    name: 'Michael Kors',
  },
  {
    id: '662',
    slug: 'nike',
    name: 'Nike',
  },
  {
    id: '665',
    slug: 'nine-west',
    name: 'Nine West',
  },
  {
    id: '696',
    slug: 'old-navy',
    name: 'Old Navy',
  },
  {
    id: '2062',
    slug: 'oysho',
    name: 'Oysho',
  },
  {
    id: '726',
    slug: 'pandora',
    name: 'Pandora',
  },
  {
    id: '765',
    slug: 'pepe-jeans',
    name: 'Pepe Jeans',
  },
  {
    id: '2121',
    slug: 'prada',
    name: 'Prada',
  },
  {
    id: '2140',
    slug: 'pull-bear',
    name: 'Pull & Bear',
  },
  {
    id: '2141',
    slug: 'puma',
    name: 'Puma',
  },
  {
    id: '782',
    slug: 'rapsodia',
    name: 'RAPSODIA',
  },
  {
    id: '791',
    slug: 'ray-ban',
    name: 'Ray-Ban',
  },
  {
    id: '802',
    slug: 'reebok',
    name: 'Reebok',
  },
  {
    id: '2207',
    slug: 'sfera',
    name: 'Sfera',
  },
  {
    id: '2211',
    slug: 'shasa',
    name: 'Shasa',
  },
  {
    id: '6471',
    slug: 'shein',
    name: 'Shein',
  },
  {
    id: '1141',
    slug: 'steve-madden',
    name: 'Steve Madden',
  },
  {
    id: '2295',
    slug: 'stradivarius',
    name: 'Stradivarius',
  },
  {
    id: '7387',
    slug: 'studio-f',
    name: 'Studio F',
  },
  {
    id: '2365',
    slug: 'tommy-hilfiger',
    name: 'Tommy Hilfiger',
  },
  {
    id: '2372',
    slug: 'topshop',
    name: 'Topshop',
  },
  {
    id: '2373',
    slug: 'tory-burch',
    name: 'Tory Burch',
  },
  {
    id: '2376',
    slug: 'tous',
    name: 'Tous',
  },
  {
    id: '964',
    slug: 'vans',
    name: 'Vans',
  },
  {
    id: '7054',
    slug: 'victorias-secret',
    name: "Victoria's Secret",
  },
  {
    id: '1075',
    slug: 'zara',
    name: 'Zara',
  },
];

type Props = {
  setBrand: (brand: IBrand) => void;
  brandSelectedId: string;
};

export const BrandSelect = ({ setBrand, brandSelectedId = '' }: Props) => {
  const { onCloseModal } = useModal();

  const handleClick = (brand: IBrand) => {
    setBrand(brand);
    onCloseModal();
  };

  return (
    <div className="flex flex-col">
      {brands.map((brand: IBrand) => (
        <div
          onClick={() => handleClick(brand)}
          key={brand.id}
              className={`flex justify-between items-center 
          ${brandSelectedId === brand.id ? 'text-darkPrimary' : 'text-black'}
              border-b py-4 cursor-pointer`}
        >
          <span>{brand.name}</span>
          {brandSelectedId === brand.id ? (
            <IoIosCheckmark size={24} color="var(--primary)" />
          ) : null}
        </div>
      ))}
    </div>
  );
};
