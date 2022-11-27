import UIBanner from 'ququmber-ui/alerts/UIBanner';
import Colors from 'ququmber-ui/Colors';

const emptyFn = () => {};

const UIBannerSample = () => {
  return (
    <div>
      <UIBanner onClose={emptyFn}>
        <p css={{fontWeight: 'bold'}}>Planned outage</p>
        <p>
          There will be a service outage between the hours of 1am and 4am
          on 3/15/20 to make schema updates to the database.
        </p>
      </UIBanner>
      <div css={{height: '30px'}} />
      <UIBanner onClose={emptyFn} background={Colors.LIGHTYELLOW}>
        <p css={{fontWeight: 'bold'}}>Internet disconnected</p>
        <p>Your connection was interupted. Please reconnect and refresh the tab.</p>
      </UIBanner>
    </div>
  );
};

export default UIBannerSample;
