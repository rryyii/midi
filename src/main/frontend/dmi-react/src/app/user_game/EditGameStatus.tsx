function EditGameStatus() {
    return (
        <form>
            <label htmlFor={"myComboBox"}></label>
            <input list={"optionsList"} id={"myComboBox"} className={"form-control"}/>
            <datalist id={"optionsList"}>
                <option value={"Played"}/>
                <option value={"Completed"}/>
                <option value={"Dropped"}/>
                <option value={"Planned"}/>
            </datalist>
        </form>
    );
}

export default EditGameStatus;