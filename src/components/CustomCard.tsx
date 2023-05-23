import React, {ReactNode} from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {CardProps} from "@mui/material/Card/Card";
import Image from "next/image";
import {Box} from "@mui/material";


type ICustomCardProps = {
    image?: string,
    title?: string,
    children?: ReactNode,
} & CardProps

const CustomCard: React.FC<ICustomCardProps> = ({image, title, children, ...props}) => {
    return (
        <Card {...props} className="relative">
            {
                image && <div className="aspect-[4/2.5] relative">
                    <Image fill src={image} alt={`image of ${title}`}/>
                </div>
            }
            <CardContent>
                <Box mt={1} mb={2}>
                    {
                        title && <Typography gutterBottom variant="h6" component="span" fontWeight="bold">
                            {title}
                        </Typography>
                    }
                </Box>
                <div>
                    {children}
                </div>

            </CardContent>
        </Card>
    )
}


export default React.memo(CustomCard)