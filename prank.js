/**
 * The PrankCoworker function is used to prank new recruits.
 */
function PrankCoworker(){
    /**
     * The getLocation returns the location of a coworker
     * @returns {Promise} Promise object returns the location of the coworked
     */
    async function getLocation(){
        return await $.get('http://localhost/locate');
    };

    /**
     * The addSalt function adds salt to coworker's coffee
     * @param {string} salt 
     * @returns {Promise}
     */
    async function addSalt(salt){
        return await $.post('http://localhost/addsalt', salt);
    };

    /**
     * The runAway function is used to run away after prank or if the coworker 
     * is in the office.
     * @returns {Promise}
     */
    async function runAway() {
        return await $.get('http://localhost/run');
    };

    /**
     * The prank function is used to prank a coworker.
     * @returns {Promise}
     */
    async function prank(){
        let loc = await getLocation();
        if (!!loc?.location && loc.location === 'in his office'){
            return await runAway();
        } else if (!!loc?.location && loc.location === 'in the kitchen'){
            await addSalt('salt');
            return await runAway();
        }
    };

    /**
     * The function bindEvents binds the events triggered in the view.
     */
    PrankCoworker.prototype.bindEvents = () => {
        $('#btn_prank').on('click', () => {
            $('#div_prank').removeClass('d-none');
        });
    };
};

/**
 * Called once the document is loaded.
 */
$(() => {
    new PrankCoworker().bindEvents();
});