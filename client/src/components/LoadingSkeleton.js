import React from "react";

import Skeleton from "react-loading-skeleton";
import { Card } from "semantic-ui-react";

const LoadingSkeleton = () => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card fluid key={index}>
      <Card.Content>
        <Skeleton width="60%" count={3} />
      </Card.Content>
    </Card>
  ));
  return content;
};

export default LoadingSkeleton;
